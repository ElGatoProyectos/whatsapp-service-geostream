import prisma from "../prisma.js";

class NotificationService {
  async registerNotification(number, message) {
    try {
      await prisma.notificafications.create({
        data: { phone_client: number, message },
      });
      await prisma.$disconnect();
    } catch (error) {
      console.log(error);
      throw new Error("Error in prisma.notifications.create");
    }
  }

  // todo validacion de autenticacion
  async sendNotification(number, message, client) {
    const chatId = `51${number}@c.us`;
    await client.sendMessage(chatId, message);
    // await this.registerNotification(number, message);
    try {
    } catch (error) {
      throw new Error("Error in send notification");
    }
  }
}

export const notificationService = new NotificationService();
