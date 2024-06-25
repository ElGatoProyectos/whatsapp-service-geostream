import express from "express";
import router from "./routes/notification.route.js";
import qr from "./routes/qr.route.js";
import rateLimit from "express-rate-limit";

import qrcode from "qrcode";

import fs from "fs";
import path from "path";
import pkg from "whatsapp-web.js";
import helmet from "helmet";
const { Client, LocalAuth } = pkg;

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  try {
    const dir = path.join(__dirname, "..", "public", "qr_codes");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const qrPath = path.join(dir, "whatsapp_qr.png");

    qrcode.toFile(qrPath, qr, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

client.initialize();

app.set("whatsappClient", client);

app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10, // Límite de 5 peticiones por ventana de tiempo por IP
  message: "Too many requests, please try again later.",
  headers: true, // Incluir headers RateLimit
});

// app.use(limiter);

app.use("", limiter, qr);
app.use("", router);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
