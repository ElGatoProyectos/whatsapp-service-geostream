class NotificationController {
  async sendMessage(request, response) {
    try {
      const { message, number } = request.body;

      response.json({ message: "Mensaje enviado satisfactroriamente" });
    } catch (error) {}
  }
}

export const notificationcontroller = new NotificationController();
