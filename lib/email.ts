import { Resend } from "resend";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY nije postavljen. Email funkcionalnost neće raditi.");
    return null;
  }
  return new Resend(apiKey);
};

export async function sendReservationEmail(data: {
  ime: string;
  email: string;
  telefon: string;
  usluga: string;
  datum: string;
  vrijeme: string;
  poruka?: string;
}) {
  try {
    const resend = getResend();
    if (!resend) {
      return { success: false, error: "Email servis nije konfiguriran" };
    }

    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.TO_EMAIL || "Serviszaciscenjealadin@gmail.com";

    console.log("Sending email from:", fromEmail, "to:", toEmail);

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Nova rezervacija - ${data.ime}`,
      html: `
        <h2>Nova rezervacija</h2>
        <p><strong>Ime:</strong> ${data.ime}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.telefon}</p>
        <p><strong>Usluga:</strong> ${data.usluga}</p>
        <p><strong>Datum:</strong> ${data.datum}</p>
        <p><strong>Vrijeme:</strong> ${data.vrijeme}</p>
        ${data.poruka ? `<p><strong>Poruka:</strong> ${data.poruka}</p>` : ""}
      `,
    });

    console.log("Email sent successfully:", result);
    return { success: true, result };
  } catch (error: any) {
    console.error("Error sending email:", error);
    // Detaljnije logiranje greške
    if (error?.message) {
      console.error("Error message:", error.message);
    }
    if (error?.response) {
      console.error("Error response:", error.response);
    }
    if (error?.response?.data) {
      console.error("Error response data:", error.response.data);
    }
    
    // Resend specifične greške
    const errorMessage = error?.message || "Nepoznata greška";
    const errorDetails = error?.response?.data || error;
    
    return { 
      success: false, 
      error: errorMessage,
      details: errorDetails
    };
  }
}

export async function sendContactEmail(data: {
  ime: string;
  email: string;
  telefon?: string;
  poruka: string;
}) {
  try {
    const resend = getResend();
    if (!resend) {
      return { success: false, error: "Email servis nije konfiguriran" };
    }

    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.TO_EMAIL || "Serviszaciscenjealadin@gmail.com";

    console.log("Sending email from:", fromEmail, "to:", toEmail);

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Nova kontakt poruka - ${data.ime}`,
      html: `
        <h2>Nova kontakt poruka</h2>
        <p><strong>Ime:</strong> ${data.ime}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.telefon ? `<p><strong>Telefon:</strong> ${data.telefon}</p>` : ""}
        <p><strong>Poruka:</strong></p>
        <p>${data.poruka}</p>
      `,
    });

    console.log("Email sent successfully:", result);
    return { success: true, result };
  } catch (error: any) {
    console.error("Error sending email:", error);
    // Detaljnije logiranje greške
    if (error?.message) {
      console.error("Error message:", error.message);
    }
    if (error?.response) {
      console.error("Error response:", error.response);
    }
    if (error?.response?.data) {
      console.error("Error response data:", error.response.data);
    }
    
    // Resend specifične greške
    const errorMessage = error?.message || "Nepoznata greška";
    const errorDetails = error?.response?.data || error;
    
    return { 
      success: false, 
      error: errorMessage,
      details: errorDetails
    };
  }
}

