import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return NextResponse.json({
        error: "API key ili Place ID nisu postavljeni",
        hasApiKey: !!apiKey,
        hasPlaceId: !!placeId,
      });
    }

    // Test Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews,rating,user_ratings_total&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json({
      status: data.status,
      placeName: data.result?.name || "N/A",
      rating: data.result?.rating || "N/A",
      totalRatings: data.result?.user_ratings_total || 0,
      reviewsCount: data.result?.reviews?.length || 0,
      reviews: data.result?.reviews?.map((r: any) => ({
        author: r.author_name,
        rating: r.rating,
        text: r.text?.substring(0, 100) + "...",
        time: r.time,
      })) || [],
      fullResponse: data,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    });
  }
}

