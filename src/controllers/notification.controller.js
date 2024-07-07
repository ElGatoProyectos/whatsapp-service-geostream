import path from "path";
import { notificationService } from "../services/notification.service.js";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { adminService } from "../services/admin.service.js";

class NotificationController {
  async sendMessage(request, response) {
    try {
      const { country_code, message, phone } = request.body;
      const client = request.app.get("whatsappClient");

      await notificationService.sendNotification(
        country_code,
        phone,
        message,
        client
      );
      response
        .status(200)
        .json({ message: "Mensaje enviado satisfactroriamente" });
    } catch (error) {
      response.status(500).json({ message: "Error send message" });
    }
  }

  // async BuyOnRequest(request, response) {
  //   try {
  //     const { message } = request.body;
  //     const client = request.app.get("whatsappClient");

  //     const admin = await adminService.findPhone();

  //     await notificationService.sendNotification(
  //       admin.country_code,
  //       admin.phone,
  //       message,
  //       client
  //     );
  //     response
  //       .status(200)
  //       .json({ message: "Mensaje enviado satisfactroriamente" });
  //   } catch (error) {
  //     response.status(500).json({ message: "Error send message" });
  //   }
  // }

  async getQr(request, response) {
    try {
      // Define la ruta al archivo QR
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const qrCodePath = "./qr_codes/whatsapp_qr.png";
      const imagePath = path.join(__dirname, "../..", "public", qrCodePath);

      // Lee el archivo QR y lo envía como respuesta
      await fs.readFile(imagePath);
      response.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Error in capture qrcode" });
    }
  }
}

export const notificationcontroller = new NotificationController();
