import { NextRequest, NextResponse } from "next/server";
import { sendReservationEmail } from "@/lib/email";
import { z } from "zod";

const reservationSchema = z.object({
  ime: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  email: z.string().email("Nevažeća email adresa"),
  telefon: z.string().min(6, "Telefon mora imati najmanje 6 znakova"),
  usluga: z.string().min(1, "Morate odabrati uslugu"),
  datum: z.string().min(1, "Morate odabrati datum"),
  vrijeme: z.string().min(1, "Morate odabrati vrijeme"),
  poruka: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validacija podataka
    const validatedData = reservationSchema.parse(body);

    // Slanje emaila
    const result = await sendReservationEmail(validatedData);

    if (!result.success) {
      console.error("Email sending failed:", result.error, result.details);
      return NextResponse.json(
        { 
          error: "Greška pri slanju emaila",
          details: process.env.NODE_ENV === "development" ? {
            error: result.error,
            details: result.details
          } : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Rezervacija je uspješno poslana!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Nevažeći podaci", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error processing reservation:", error);
    return NextResponse.json(
      { error: "Greška pri obradi rezervacije" },
      { status: 500 }
    );
  }
}

