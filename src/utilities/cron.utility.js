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

    const accounts = await prisma.account.findMany({
      where: { status: "BOUGHT" },
    });

    const platforms = await prisma.platform.findMany({});

    let platformSelected;

    await prisma.$disconnect();

    const filteredAccounts = accounts.filter((account) => {
      let creationDate;
      if (account.renewal_date) {
        creationDate = new Date(account.renewal_date);
      } else {
        creationDate = new Date(account.purchase_date);
      }
      const expirationDate = new Date(creationDate);

      const platform = platforms.find(
        (item) => item.id === account.platform_id
      );

      platformSelected = platform;

      expirationDate.setDate(
        creationDate.getDate() + platform.days_duration - 2
      );

      if (expirationDate <= currentDate) return account;
    });

    await Promise.all(
      filteredAccounts.map(async (account) => {
        const user = await prisma.user.findFirst({
          where: { id: account.user_id },
        });

        await notificationService.sendNotification(
          user.country_code,
          user.phone,
          `Te queda un dia en tu cuenta de ${platformSelected.name} 🥺`,
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
      where: { status: "NOT_BOUGHT" },
    });

    console.log(accounts);

    const [admin] = await prisma.admin.findMany();

    if (accounts.length < 5) {
      await notificationService.sendNotification(
        admin.country_code,
        admin.phone,
        "Hola " +
          admin.full_name +
          ", le quedan menos de 5 cuentas, verifique y registre nuevas cuentas 😶",
        client
      );
    }
    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
  }
}

async function validateConsumidorDistribuidor(client) {
  try {
    const users = await prisma.user.findMany({
      where: { role: "DISTRIBUTOR" },
    });
    await Promise.all(
      users.map(async (user) => {
        const created = new Date(user.created_at).getDate();

        const dayActually = new Date().getDate();

        if (dayActually >= created) {
          const accountsActiveForUserSelected = await prisma.account.findMany({
            where: { status: "BOUGHT", user_id: user.id },
          });
          if (accountsActiveForUserSelected < 10) {
            await prisma.user.update({
              where: { id: user.id },
              data: { role: "USER" },
            });

            await notificationService.sendNotification(
              user.country_code,
              user.phone,
              "Su cuenta fue cambiada a usuario CONSUMIDOR",
              client
            );
          }
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
}
