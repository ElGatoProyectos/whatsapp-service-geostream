import express from "express";
import { notificationcontroller } from "../controllers/notification.controller.js";
import { notificationMiddleware } from "../middlewares/notification.middleware.js";

const router = express.Router();

const prefix = "/notifications";

router.post(
  prefix,
  notificationMiddleware.validateBody,
  notificationcontroller.sendMessage
);

export default router;
