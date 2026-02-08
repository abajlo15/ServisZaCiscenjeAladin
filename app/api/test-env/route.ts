import { NextResponse } from "next/server";

export async function GET() {
  // Provjeri da li su environment varijable postavljene (bez prikazivanja stvarnih vrijednosti)
  const hasApiKey = !!process.env.GOOGLE_PLACES_API_KEY;
  const hasPlaceId = !!process.env.GOOGLE_PLACE_ID;
  
  const apiKeyLength = process.env.GOOGLE_PLACES_API_KEY?.length || 0;
  const placeIdLength = process.env.GOOGLE_PLACE_ID?.length || 0;
  
  // Prikaži prvih nekoliko znakova za provjeru (bez sigurnosnog rizika)
  const apiKeyPreview = process.env.GOOGLE_PLACES_API_KEY 
    ? `${process.env.GOOGLE_PLACES_API_KEY.substring(0, 10)}...` 
    : "N/A";
  const placeIdPreview = process.env.GOOGLE_PLACE_ID 
    ? `${process.env.GOOGLE_PLACE_ID.substring(0, 20)}...` 
    : "N/A";

  return NextResponse.json({
    hasApiKey,
    hasPlaceId,
    apiKeyLength,
    placeIdLength,
    apiKeyPreview,
    placeIdPreview,
    message: hasApiKey && hasPlaceId 
      ? "Environment varijable su postavljene ✓" 
      : "Environment varijable nisu postavljene ✗",
  });
}

