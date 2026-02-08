import { NextResponse } from "next/server";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

interface GooglePlaceDetails {
  result: {
    reviews?: GoogleReview[];
    name?: string;
    formatted_address?: string;
  };
  status: string;
}

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    console.log("API Key exists:", !!apiKey);
    console.log("Place ID exists:", !!placeId);
    console.log("Place ID value:", placeId ? `${placeId.substring(0, 10)}...` : "N/A");

    if (!apiKey || !placeId) {
      console.warn("Google Places API key ili Place ID nisu postavljeni");
      return NextResponse.json(
        { reviews: [], error: "Google Places API nije konfiguriran. Provjerite .env.local" },
        { status: 200 }
      );
    }

    // Dohvati detalje mjesta s recenzijama
    // Koristimo sve relevantne fieldove za dohvaćanje recenzija
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews,rating,user_ratings_total,formatted_address&key=${apiKey}&language=hr`;
    
    console.log("Fetching from Google Places API...");
    console.log("URL (bez API key):", url.replace(apiKey, "***"));
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error("HTTP Error:", response.status, response.statusText);
      return NextResponse.json(
        { reviews: [], error: `HTTP greška: ${response.status}` },
        { status: 200 }
      );
    }
    
    const data: GooglePlaceDetails = await response.json();
    
    console.log("Google Places API Status:", data.status);
    console.log("Full API Response:", JSON.stringify(data, null, 2));
    console.log("Number of reviews:", data.result?.reviews?.length || 0);
    
    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status, JSON.stringify(data, null, 2));
      return NextResponse.json(
        { 
          reviews: [], 
          error: `Google Places API greška: ${data.status}. Provjerite Place ID i API ključ.`,
          debug: {
            status: data.status,
            errorMessage: (data as any).error_message || "N/A"
          }
        },
        { status: 200 }
      );
    }

    if (!data.result) {
      console.error("Google Places API nije vratio result objekt");
      return NextResponse.json(
        { reviews: [], error: "Google Places API nije vratio podatke" },
        { status: 200 }
      );
    }

    // Provjeri da li postoje recenzije
    if (!data.result.reviews || data.result.reviews.length === 0) {
      console.warn("Nema dostupnih recenzija za ovaj Place ID");
      console.warn("Place name:", data.result.name || "N/A");
      console.warn("Available fields:", Object.keys(data.result));
      console.warn("Rating:", (data.result as any).rating || "N/A");
      console.warn("Total ratings:", (data.result as any).user_ratings_total || 0);
      
      // Ako postoje ocjene ali nema recenzija, to je čest problem
      const totalRatings = (data.result as any).user_ratings_total || 0;
      if (totalRatings > 0) {
        console.warn(`Postoji ${totalRatings} ocjena, ali Google Places API ne vraća recenzije.`);
        console.warn("Mogući uzroci:");
        console.warn("1. Google Places API Details endpoint možda ne vraća sve recenzije");
        console.warn("2. Recenzije možda nisu javno dostupne preko API-ja");
        console.warn("3. Možda treba koristiti noviji Places API (New)");
      }
      
      return NextResponse.json(
        { 
          reviews: [], 
          error: "Nema dostupnih recenzija za ovaj Place ID. Provjerite da li Google Business profil ima recenzije.",
          debug: {
            placeName: data.result.name || "N/A",
            hasReviews: false,
            totalRatings: totalRatings,
            rating: (data.result as any).rating || "N/A"
          }
        },
        { status: 200 }
      );
    }

    console.log("Total reviews found:", data.result.reviews.length);
    console.log("Review ratings:", data.result.reviews.map(r => r.rating));

    // Filtriraj samo 5-zvjezdice recenzije
    const allFiveStarReviews = data.result.reviews.filter((review) => review.rating === 5);
    console.log(`Recenzije s 5 zvjezdica: ${allFiveStarReviews.length} od ${data.result.reviews.length}`);
    
    const fiveStarReviews = allFiveStarReviews
      .sort((a, b) => b.time - a.time) // Sortiraj po datumu (najnovije prvo)
      .slice(0, 5) // Uzmi prvih 5
      .map((review) => {
        // Formatiraj ime: "Ime P."
        const nameParts = review.author_name.split(" ");
        const formattedName = nameParts.length > 1
          ? `${nameParts[0]} ${nameParts[1].charAt(0)}.`
          : nameParts[0];
        
        // Ekstraktiraj grad iz adrese ili koristi "Zadar" kao fallback
        const location = data.result.formatted_address 
          ? data.result.formatted_address.split(',')[0] || "Zadar"
          : "Zadar";
        
        return {
          name: formattedName,
          location: location,
          text: review.text,
          rating: review.rating,
          date: review.relative_time_description,
        };
      });

    // Ako ima manje od 5 recenzija s 5 zvjezdica, uzmi i druge recenzije
    let finalReviews = fiveStarReviews;
    
    if (fiveStarReviews.length < 5) {
      console.warn(`Pronađeno samo ${fiveStarReviews.length} recenzija s 5 zvjezdica (od ${allFiveStarReviews.length} ukupno)`);
      
      // Ako nema dovoljno 5-zvjezdica, uzmi i najbolje ocjenjene recenzije (4+ zvjezdice)
      if (fiveStarReviews.length < 5) {
        const highRatedReviews = data.result.reviews
          .filter((review) => review.rating >= 4)
          .sort((a, b) => {
            // Prvo sortiraj po ocjeni (5 > 4), zatim po datumu
            if (b.rating !== a.rating) {
              return b.rating - a.rating;
            }
            return b.time - a.time;
          })
          .slice(0, 5 - fiveStarReviews.length)
          .map((review) => {
            const nameParts = review.author_name.split(" ");
            const formattedName = nameParts.length > 1
              ? `${nameParts[0]} ${nameParts[1].charAt(0)}.`
              : nameParts[0];
            
            // Ekstraktiraj grad iz adrese ili koristi "Zadar" kao fallback
            const location = data.result.formatted_address 
              ? data.result.formatted_address.split(',')[0] || "Zadar"
              : "Zadar";
            
            return {
              name: formattedName,
              location: location,
              text: review.text,
              rating: review.rating,
              date: review.relative_time_description,
            };
          });
        
        finalReviews = [...fiveStarReviews, ...highRatedReviews].slice(0, 5);
        console.log(`Dodano ${highRatedReviews.length} dodatnih recenzija s visokom ocjenom. Ukupno: ${finalReviews.length}`);
      }
    }

    return NextResponse.json(
      { reviews: finalReviews },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json(
      { reviews: [], error: "Greška pri dohvaćanju recenzija" },
      { status: 500 }
    );
  }
}

