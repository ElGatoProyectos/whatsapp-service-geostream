class NotificationService {
  async registerNotification(number, message) {
    try {
    } catch (error) {}
  }

  // todo validacion de autenticacion
  async sendNotification(number, message) {
    const chatId = `51${number}@c.us`;
    const client = request.app.get("whatsappClient");

    await client.sendMessage(chatId, message);
    try {
    } catch (error) {}
  }
}

export const notificationService = new NotificationService();
