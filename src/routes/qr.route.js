import express from "express";
import { notificationcontroller } from "../controllers/notification.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

const prefix = "/qrcode";

router.get(
  prefix,
  authMiddleware.validateAuthorizationAdmin,
  notificationcontroller.getQr
);

export default router;
