import { notificationService } from "../services/notification.service.js";

class NotificationController {
  async sendMessage(request, response) {
    try {
      const { message, phone } = request.body;
      const client = request.app.get("whatsappClient");

      await notificationService.sendNotification(phone, message, client);
      response
        .status(200)
        .json({ message: "Mensaje enviado satisfactroriamente" });
    } catch (error) {
      return response.status(500).json({ message: "Error send message" });
    }
  }

  async getQr(request, response) {
    try {
      const file = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "qr_codes",
        "whatsapp_qr.png"
      );
      response.sendFile(
        "./qr_codes/whatsapp_qr.png",
        { root: "./public" },
        (err) => {
          return response
            .status(500)
            .json({ message: "Error in capture qrcode" });
        }
      );
    } catch (error) {
      return response.status(500).json({ message: "Error in capture qrcode" });
    }
  }
}

export const notificationcontroller = new NotificationController();
