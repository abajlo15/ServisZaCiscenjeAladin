import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { z } from "zod";

const contactSchema = z.object({
  ime: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  email: z.string().email("Nevažeća email adresa"),
  telefon: z.string().optional(),
  poruka: z.string().min(10, "Poruka mora imati najmanje 10 znakova"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validacija podataka
    const validatedData = contactSchema.parse(body);

    // Slanje emaila
    const result = await sendContactEmail(validatedData);

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
      { message: "Poruka je uspješno poslana!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Nevažeći podaci", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error processing contact:", error);
    return NextResponse.json(
      { error: "Greška pri obradi poruke" },
      { status: 500 }
    );
  }
}

