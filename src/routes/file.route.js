import express from "express";
import { fileController } from "../controllers/file.controller.js";

const fileRouter = express.Router();
const prefix = "/file";

// fileRouter.post(prefix + "/profile/:id", fileController.registerImageProfile);
// fileRouter.post(
//   prefix + "/profile-admin",
//   fileController.registerImageProfileAdmin
// );
// fileRouter.post(prefix + "/voucher/:id", fileController.registerVoucher);

// fileRouter.get(prefix + "/profile/:id", fileController.getProfile);
// fileRouter.get(prefix + "/profile-admin", fileController.getImageAdmin);

// fileRouter.get(prefix + "/voucher/:id", fileController.getVoucher);

fileRouter.post(prefix + "/pdf", fileController.registerPdf);
fileRouter.get(prefix + "/pdf", fileController.getPdf);

export default fileRouter;
