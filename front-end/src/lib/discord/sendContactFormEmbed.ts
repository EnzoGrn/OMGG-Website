type ContactFormPayload = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  object: string;
  message: string;
  services: string[];
};

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export async function sendContactFormEmbed(payload: ContactFormPayload) {
  if (!DISCORD_WEBHOOK_URL)
    return;
  const { firstname, lastname, email, phone, object, message, services } = payload;

  const mainPayload = {
    username: "OMGG Bot",
    embeds: [
      {
        title: "📬 Nouveau message de contact",
        color: 0xffa500,
        fields: [
          {
            name: "👤 Contact",
            value: `**${firstname} ${lastname}**\n${email}\n${phone}`,
          },
          {
            name: "📌 Objet",
            value: object,
          },
          {
            name: "💬 Message",
            value: message,
          },
          {
            name: "🛠 Services intéressés",
            value: services.length > 0 ? services.map(s => `- ${s}`).join('\n') : "Aucun service spécifié",
          },
        ],
        footer: {
          text: "OMGG — Formulaire de contact",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mainPayload),
  });
}
