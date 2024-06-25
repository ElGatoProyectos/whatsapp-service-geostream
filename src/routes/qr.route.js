import express from "express";
import { notificationcontroller } from "../controllers/notification.controller.js";

const router = express.Router();

const prefix = "/qrcode";

router.get(prefix, notificationcontroller.getQr);

export default router;
