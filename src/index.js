import express from "express";
import router from "./routes/notification.route.js";
import qr from "./routes/qr.route.js";
import rateLimit from "express-rate-limit";

import qrcode from "qrcode";

import fs from "fs";
import path from "path";
import pkg from "whatsapp-web.js";
import helmet from "helmet";
import cron from "node-cron";
const { Client, LocalAuth } = pkg;

import { fileURLToPath } from "url";
import { instanceCronNotifications } from "./utilities/cron.utility.js";
import fileRouter from "./routes/file.route.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const wwebVersion = "2.2412.54";

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
    console.log("qrrrr");
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

    console.log("QR created");
  } catch (error) {
    console.log(error);
  }
});

client.on("ready", () => {
  console.log("cliente ready");
});

client.initialize();
console.log("inicializado");

app.set("whatsappClient", client);
instanceCronNotifications(client);

app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
  headers: true,
});

// app.use(limiter);

app.use("", limiter, qr);
app.use("", router);
app.use("", fileRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
