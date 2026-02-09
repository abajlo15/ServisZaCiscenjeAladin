import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(request: NextRequest) {
  try {
    // Provjera environment varijabli
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;

    const diagnostics = {
      hasApiKey: !!apiKey,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + "..." : "N/A",
      fromEmail: fromEmail || "N/A (koristi se onboarding@resend.dev)",
      toEmail: toEmail || "N/A (koristi se Serviszaciscenjealadin@gmail.com)",
      nodeEnv: process.env.NODE_ENV,
    };

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY nije postavljen",
          diagnostics,
        },
        { status: 500 }
      );
    }

    // Test slanja emaila
    const resend = new Resend(apiKey);

    const testResult = await resend.emails.send({
      from: fromEmail || "onboarding@resend.dev",
      to: toEmail || "Serviszaciscenjealadin@gmail.com",
      subject: "Test Email - AladinWEB",
      html: `
        <h2>Test Email</h2>
        <p>Ovo je test email za provjeru Resend konfiguracije.</p>
        <p><strong>Vrijeme:</strong> ${new Date().toISOString()}</p>
        <p><strong>From:</strong> ${fromEmail || "onboarding@resend.dev"}</p>
        <p><strong>To:</strong> ${toEmail || "Serviszaciscenjealadin@gmail.com"}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Test email je uspješno poslan!",
      diagnostics,
      result: testResult,
    });
  } catch (error: any) {
    console.error("Test email error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Nepoznata greška",
        details: error?.response?.data || error,
        stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 }
    );
  }
}

