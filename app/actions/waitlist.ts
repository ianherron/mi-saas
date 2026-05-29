"use server";

const AUDIENCE_ID = "2ef75ed4-5e19-4348-8b02-b3aa010ccd07";

export async function joinWaitlist(email: string): Promise<{ success: boolean; message: string }> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Ingresá un email válido." };
  }

  const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  if (res.ok) {
    return { success: true, message: "¡Listo! Te avisamos cuando lancemos." };
  }

  const data = await res.json();
  if (data?.name === "validation_error" || res.status === 422) {
    return { success: true, message: "¡Listo! Ya estás en la lista." };
  }

  return { success: false, message: "Algo salió mal, intentá de nuevo." };
}
