import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

import express from "express";
import router from "./routes/notification.route.js";
const app = express();

app.use(express.json());

app.use("", router);

app.listen(4000);

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "sessions",
  }),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Cliente logueado");

  const number = "51969710219";
  const chatId = `${number}@c.us`;

  client
    .sendMessage(
      chatId,
      "Hola, este es un mensaje automático desde WhatsApp Web Client"
    )
    .then((response) => {
      console.log("Mensaje enviado con éxito a", chatId);
    })
    .catch((err) => {
      console.error("Error enviando mensaje a", chatId, ":", err);
    });
});
client.on("message", (message) => {
  if (message.body === "hello") {
    client.sendMessage(message.from, "Hola!");
  }
});

client.initialize();
