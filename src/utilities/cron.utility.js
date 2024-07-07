import cron from "node-cron";
import prisma from "../prisma.js";
import { notificationService } from "../services/notification.service.js";
import { base_api_front } from "../api.js";
import axios from "axios";

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

//todo ok
async function sendNotificationDays(client) {
  try {
    const filteredAccounts = await axios.get(
      `${base_api_front}/api/notification/not-1`
    );

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

//todo ok
async function sendNotificationFewAccounts(client) {
  try {
    const response = await axios.get(
      `${base_api_front}/api/notification/not-2`
    );
    const accounts = response.accounts;

    const admin = response.admin;

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
  } catch (error) {
    console.log(error);
  }
}

async function validateConsumidorDistribuidor(client) {
  try {
    const response = await axios.get(
      `${base_api_front}/api/notification/not-3`
    );

    const users = response.users;
    const accountsActive = response.accountsActive;
    await Promise.all(
      users.map(async (user) => {
        const created = new Date(user.created_at).getDate();

        const dayActually = new Date().getDate();

        if (dayActually >= created) {
          const accountsActiveForUserSelected = accountsActive.filter(
            (item) => (item.user_id = user.id)
          );
          if (accountsActiveForUserSelected < 10) {
            await axios.put(`${base_api}/api/user/${user.id}`, {
              role: "USER",
              enabled: "y",
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
