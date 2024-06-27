import cron from "node-cron";
import prisma from "../prisma.js";
import { notificationService } from "../services/notification.service.js";

export async function instanceCronNotifications(client) {
  try {
    cron.schedule("0 6 * * *", async () => {
      if (client) {
        // notificacion te quedan pocos dias
        await sendNotificationDays(client);
        // notificacion de que tienes pocos productos
        await sendNotificationFewAccounts(client);
        // notificacion de
      }
    });

    cron.schedule("0 0 * * *", async () => {
      if (client) {
        await validateConsumidorDistribuidor(client);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendNotificationDays(client) {
  try {
    const currentDate = new Date();

    // Obtener todas las cuentas
    const accounts = await prisma.account.findMany({
      where: { is_active: true },
    });
    await prisma.$disconnect();

    // Filtrar las cuentas que cumplen con la condición
    const filteredAccounts = accounts.filter((account) => {
      let creationDate;
      if (account.renovation_date) {
        creationDate = new Date(account.renovation_date);
      } else {
        creationDate = new Date(account.created_at);
      }
      const expirationDate = new Date(creationDate);
      expirationDate.setDate(
        creationDate.getDate() + account.numb_days_duration - 2
      );

      if (expirationDate <= currentDate) return account;
    });

    await Promise.all(
      filteredAccounts.map(async (account) => {
        const user = await prisma.user.findFirst({
          where: { id: account.user_id },
        });

        await notificationService.sendNotification(
          user.phone,
          `Te queda un dia en tu cuenta de streaming 😔🥺`,
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
    const accounts = await prisma.account.findMany({
      where: { is_active: false },
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

async function validateConsumidorDistribuidor() {
  try {
    const users = await prisma.user.findMany();
    await Promise.all(
      users.map(async (user) => {
        // obtenemos las cuentas activas que estan ahora
        const created = new Date(user.created_at);

        const dayActually = new Date().getDate() + 1;

        if (dayActually > created.getDate()) {
          if (user.role === "DISTRIBUTOR") {
            const accountsActiveForUserSelected = await prisma.account.findMany(
              {
                where: { is_active: true, user_id: user.id },
              }
            );
            if (accountsActiveForUserSelected < 10) {
              await prisma.user.update({
                where: { id: user.id },
                data: { role: "USER" },
              });
            }
          }
        }
      })
    );
  } catch (error) {}
}
