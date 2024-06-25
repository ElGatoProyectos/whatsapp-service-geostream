import express from "express";
import { notificationcontroller } from "../controllers/notification.controller.js";
import { notificationMiddleware } from "../middlewares/notification.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

const prefix = "/notifications";

router.post(
  prefix,
  authMiddleware.validateAuthorization,
  notificationMiddleware.validateBody,
  notificationcontroller.sendMessage
);

export default router;
