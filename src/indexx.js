import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

import express from "express";
import router from "./routes/notification.route.js";

const app = express();
app.use(express.json());

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

// client.on("ready", () => {
//   console.log("Cliente logueado");
// });

// client.on("message", (message) => {
//   if (message.body === "hello") {
//     client.sendMessage(message.from, "Hola!");
//   }
// });

client.initialize();

app.set("whatsappClient", client);

app.use("", router);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
