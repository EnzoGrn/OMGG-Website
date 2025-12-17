type GameSubmissionPayload = {
  attestant: {
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    company?: string;
    website?: string;
  };
  gameInformation: {
    name: string;
    type: string;
    playerCount: string;
    gameDuration: string;
    devStage: string;
  };
  gameDescription: {
    shortDescription?: string;
    detailedDescription?: string;
  };
  devis: {
    budget: string;
    deadline: string;
    services: {
      fullAdaptation: boolean;
      mobileApp: boolean;
      interactivePrototype: boolean;
    };
  };
  media: {
    photosUrls: string[];
    rulesUrl?: string;
  };
};

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export async function sendGameSubmissionEmbed(payload: GameSubmissionPayload) {
  if (!DISCORD_WEBHOOK_URL)
    return;
  const { attestant, gameInformation, gameDescription, devis, media } = payload;

  const mainPayload = {
    username: "OMGG Bot",
    embeds: [
      {
        title: "🎲 Nouvelle demande de devis",
        color: 0x0479ff,
        thumbnail: media.photosUrls[0] ? { url: media.photosUrls[0] } : undefined,
        fields: [
          {
            name: "🏢 Société",
            value: attestant.company ? `[${attestant.company}](${attestant.website})` : "Indépendant",
          },
          {
            name: "👤 Attestant",
            value: `**${attestant.firstname} ${attestant.lastname}**\n${attestant.email}\n${attestant.phone ?? "—"}`,
          },
          {
            name: "🎮 Jeu",
            value:
              `**Nom :** ${gameInformation.name}\n` +
              `**Type :** ${gameInformation.type}\n` +
              `**Joueurs :** ${gameInformation.playerCount}\n` +
              `**Durée :** ${gameInformation.gameDuration}\n` +
              `**Avancement :** ${gameInformation.devStage}`,
          },
          {
            name: "🧠 Description",
            value: gameDescription.shortDescription ?? gameDescription.detailedDescription ?? "—",
          },
          {
            name: "📄 Règle du jeu",
            value: `[Ouvrir les règles](${media.rulesUrl})`
          },
          {
            name: "💰 Devis",
            value:
              `**Budget :** ${devis.budget}\n` +
              `**Deadline :** ${devis.deadline}\n` +
              `**Services :**\n` +
              (devis.services.fullAdaptation ? "- Adaptation complète\n" : "") +
              (devis.services.mobileApp ? "- Application mobile\n" : "") +
              (devis.services.interactivePrototype ? "- Prototypage interactif\n" : "")
          },
        ],
        footer: {
          text: "OMGG — Soumission automatique",
        },
        timestamp: new Date().toISOString(),
      }
    ]
  };

  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mainPayload),
  });

  if (media.photosUrls.length > 0) {
    const imageEmbeds = media.photosUrls.map((url, index) => ({
      title: "📸 Visuels du jeu",
      image: { url },
      footer: {
        text: `Image ${index + 1} / ${media.photosUrls.length}`,
      },
    }));

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "OMGG Bot",
        embeds: imageEmbeds,
      }),
    });
  }
}
