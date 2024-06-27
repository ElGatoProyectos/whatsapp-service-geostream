import cron from "node-cron";
import prisma from "../prisma.js";
import { notificationService } from "../services/notification.service.js";

export async function instanceCronNotifications(client) {
  try {
    cron.schedule("0 6 * * *", async () => {
      if (client) {
        sendNotificationDays(client);
        sendNotificationFewAccounts(client);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendNotificationDays(client) {
  try {
    const currentDate = new Date();

    // Calcular la fecha límite (hoy menos 5 días)
    const limitDate = new Date();
    limitDate.setDate(currentDate.getDate() - 5);

    // Obtener todas las cuentas
    const accounts = await prisma.account.findMany();
    await prisma.$disconnect();

    // Filtrar las cuentas que cumplen con la condición
    const filteredAccounts = accounts.filter((account) => {
      const creationDate = new Date(account.created_at);
      const expirationDate = new Date(creationDate);
      expirationDate.setDate(
        creationDate.getDate() + account.numb_days_duration - 5
      );

      return expirationDate <= currentDate;
    });

    await Promise.all(
      filteredAccounts.map(async (account) => {
        const user = await prisma.user.findFirst({
          where: { id: account.user_id },
        });

        // Calcular los días restantes
        const daysRemaining = Math.ceil(
          (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        // Formatear los días restantes para la notificación
        const formattedDaysRemaining = `${daysRemaining} día(s)`;

        await notificationService.sendNotification(
          user.phone,
          `Te quedan ${formattedDaysRemaining} en tu cuenta`,
          client
        );
      })
    );
  } catch (error) {
    console.log(error);
  }
}

async function sendNotificationFewAccounts(client) {
  try {
    const currentDate = new Date();

    const limitDate = new Date();
    limitDate.setDate(currentDate.getDate() - 5);

    const accounts = await prisma.account.findMany({
      where: { is_active: true },
    });
    const [admin] = await prisma.admin.findMany();
    if (accounts.length < 5) {
      await notificationService.sendNotification(
        admin.phone,
        "Te quedan menos de 5 cuentas",
        client
      );
    }
    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
  }
}
