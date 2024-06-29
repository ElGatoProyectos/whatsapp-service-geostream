import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const initialAccounts = [
  {
    email: "jasdsad@gmail.com",
    password: "netf6541",
    description: "description www.google.com",
    pin: "1556",
    status: "NOT_BOUGHT",
    platform_id: 1, // harcodeado
  },
  {
    email: "ana.perez@gmail.com",
    password: "netf1234",
    description: "description www.google.com",
    pin: "1234",
    status: "NOT_BOUGHT",
    platform_id: 1, // harcodeado
  },
  {
    email: "maria.hulu@gmail.com",
    password: "hulu9987",
    description: "description www.google.com",
    pin: "7563",
    status: "NOT_BOUGHT",
    platform_id: 1, // harcodeado
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
  },
  {
    email: "jsffdslu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 4, // harcodeado
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
  },
];

const initialPlatforms = [
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "NETFLIX INTERNACIONAL COMPLETA 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 1250,
    price_distributor_in_cents: 1100,
    status: "IMMEDIATE_DELIVERY",
  },
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "1 PERFIL ORIGINAL NETFLIX 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 250,
    price_distributor_in_cents: 350,
    status: "IMMEDIATE_DELIVERY",
  },
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "MAX INTERNACIONAL COMPLETA 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 300,
    price_distributor_in_cents: 400,
    status: "IMMEDIATE_DELIVERY",
  },
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "1 PERFIL MAX 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 180,
    price_distributor_in_cents: 140,
    status: "IMMEDIATE_DELIVERY",
  },
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "AMAZON PRIME VIDEO COMPLETA 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 400,
    price_distributor_in_cents: 350,
    status: "IMMEDIATE_DELIVERY",
  },
];

const users = [
  {
    email: "test1@gmail.com",
    full_name: "pedro perez diaz",
    dni: "52668846",
    phone: "111222333",
    country_code: "+42",
    password: "123456",
  },
  {
    email: "test2@gmail.com",
    full_name: "Juan martinez",
    dni: "97484661",
    phone: "77788899",
    country_code: "+85",
    password: "123456",
  },
];

const admin = [
  {
    email: "admin@test.com",
    password: "123456789",
    full_name: "admin joel",
    phone: "555666111",
    country_code: "+51",
  },
];

async function main() {
  console.log(`Start seeding...`);

  const adminEncryptedPass = await Promise.all(
    admin.map(async (admin) => {
      const newPass = await bcrypt.hash(admin.password, 10);
      return { ...admin, password: newPass };
    })
  );

  await prisma.admin.createMany({
    data: adminEncryptedPass,
  });

  const usersEncryptedPass = await Promise.all(
    users.map(async (user) => {
      const newPass = await bcrypt.hash(user.password, 10);
      return { ...user, password: newPass };
    })
  );

  await prisma.user.createMany({
    data: usersEncryptedPass,
  });

  for (const platform of initialPlatforms) {
    const newPlatform = await prisma.platform.create({
      data: platform,
    });

    await prisma.$disconnect();
    console.log(`Created platform with id: ${newPlatform.id}`);
  }

  for (const account of initialAccounts) {
    const newAccount = await prisma.account.create({
      data: account,
    });
    console.log(`Created account with id: ${newAccount.id}`);
  }
  console.log("Seeding finished.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
