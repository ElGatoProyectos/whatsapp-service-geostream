import express from "express";
import { notificationcontroller } from "../controllers/notification.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import axios from "axios";

const router = express.Router();

const prefix = "/qrcode";

router.get(
  prefix,
  // authMiddleware.validateAuthorizationAdmin,
  notificationcontroller.getQr
);

router.get("/test-api", async (req, res) => {
  try {
    const response = await axios.get("http://161.132.37.105:3000/api/admin");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

export default router;
