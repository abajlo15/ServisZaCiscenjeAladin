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

    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.TO_EMAIL || "Serviszaciscenjealadin@gmail.com",
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

    return { success: true, result };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
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

    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.TO_EMAIL || "Serviszaciscenjealadin@gmail.com",
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

    return { success: true, result };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

