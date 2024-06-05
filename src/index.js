import qrcode from "qrcode-terminal";

import { Client } from "whatsapp-web.js";

const client = new Client();

Client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

Client.on("ready", () => {
  console.log("Cliente logueado");
});

Client.on("message", (message) => {
  if (message.body === "hello") {
    client.sendMessage(message.from);
  }
});

Client.initialize();
