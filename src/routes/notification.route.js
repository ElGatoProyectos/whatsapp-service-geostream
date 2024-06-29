import express from "express";
import { notificationcontroller } from "../controllers/notification.controller.js";
import { notificationMiddleware } from "../middlewares/notification.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

const prefix = "/notifications";

router.post(
  prefix,
  // authMiddleware.validateAuthorizationUser,
  notificationMiddleware.validateBody,
  notificationcontroller.sendMessage
);

router.post(
  prefix + "/buy-on-request",
  authMiddleware.validateAuthorizationUser,
  notificationMiddleware.validateBuyInRequest,
  notificationcontroller.BuyOnRequest
);

export default router;
