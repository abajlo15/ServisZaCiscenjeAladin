import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get("placeId") || process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey || !placeId) {
      return NextResponse.json({
        error: "API key ili Place ID nisu postavljeni",
      });
    }

    // Test 1: Place Details
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews,rating,user_ratings_total,formatted_address&key=${apiKey}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Test 2: Place Text Search (alternativni način)
    const placeName = detailsData.result?.name || "";
    let textSearchData = null;
    if (placeName) {
      const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName + " Zadar")}&key=${apiKey}`;
      const textSearchResponse = await fetch(textSearchUrl);
      textSearchData = await textSearchResponse.json();
    }

    return NextResponse.json({
      placeId,
      placeName: detailsData.result?.name || "N/A",
      formattedAddress: detailsData.result?.formatted_address || "N/A",
      rating: detailsData.result?.rating || "N/A",
      totalRatings: detailsData.result?.user_ratings_total || 0,
      reviewsCount: detailsData.result?.reviews?.length || 0,
      hasReviews: (detailsData.result?.reviews?.length || 0) > 0,
      apiStatus: detailsData.status,
      detailsResponse: {
        status: detailsData.status,
        hasResult: !!detailsData.result,
        availableFields: detailsData.result ? Object.keys(detailsData.result) : [],
        reviews: detailsData.result?.reviews?.map((r: any) => ({
          author: r.author_name,
          rating: r.rating,
          textLength: r.text?.length || 0,
        })) || [],
      },
      textSearchResults: textSearchData?.results?.length || 0,
      recommendations: {
        checkPlaceId: "Provjerite da li je Place ID ispravan na https://developers.google.com/maps/documentation/places/web-service/place-id",
        checkGoogleMaps: `Pretražite "${placeName}" na Google Mapsu i provjerite da li ima recenzije`,
        checkBusinessProfile: "Provjerite vaš Google Business profil - ima li javno vidljive recenzije?",
        apiLimitation: "Google Places API Details endpoint možda ne vraća sve recenzije. Neki profili imaju recenzije na Google Mapsu, ali API ih ne vraća.",
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}

