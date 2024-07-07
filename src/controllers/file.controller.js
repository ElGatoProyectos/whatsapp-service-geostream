import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    if (file.fieldname === "image") {
      folder = path.join(__dirname, "..", "..", "public", "profiles");
    } else if (file.fieldname === "voucher") {
      folder = path.join(__dirname, "..", "..", "public", "vouchers");
    } else if (file.fieldname === "pdf") {
      folder = path.join(__dirname, "..", "..", "public", "pdf");
    } else if (file.fieldname === "image-admin") {
      folder = path.join(__dirname, "..", "..", "public", "profile-admin");
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const id = req.params.id;

    if (file.fieldname === "image") {
      cb(null, `profile_${id}.png`);
    } else if (file.fieldname === "voucher") {
      cb(null, `voucher_${id}.png`);
    } else if (file.fieldname === "pdf") {
      cb(null, `documentation.pdf`);
    } else if (file.fieldname === "image-admin") {
      cb(null, `admin.png`);
    }
  },
});

const upload = multer({ storage: storage });

class FileController {
  async registerImageProfile(request, response) {
    upload.single("image")(request, response, (err) => {
      if (err) {
        return response.status(500).json({ error: err.message });
      } else {
        response
          .status(200)
          .json({ message: "File uploaded successfully", file: request.file });
      }
    });
  }
  async registerImageProfileAdmin(request, response) {
    upload.single("image-admin")(request, response, (err) => {
      if (err) {
        return response.status(500).json({ error: err.message });
      } else {
        response
          .status(200)
          .json({ message: "File uploaded successfully", file: request.file });
      }
    });
  }

  async registerVoucher(request, response) {
    upload.single("voucher")(request, response, (err) => {
      if (err) {
        return response.status(500).json({ error: err.message });
      } else {
        response
          .status(200)
          .json({ message: "File uploaded successfully", file: request.file });
      }
    });
  }

  async registerPdf(request, response) {
    upload.single("pdf")(request, response, (err) => {
      if (err) {
        return response.status(500).json({ error: err.message });
      } else {
        response
          .status(200)
          .json({ message: "File uploaded successfully", file: request.file });
      }
    });
  }

  async getProfile(request, response) {
    try {
      // Define la ruta al archivo QR
      const id = request.params.id;
      const qrCodePath = `./profiles/profile_${id}.png`;
      const imagePath = path.join(__dirname, "../..", "public", qrCodePath);

      // Lee el archivo QR y lo envía como respuesta
      await fs.readFile(imagePath);
      response.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Error in capture profile" });
    }
  }

  async getVoucher(request, response) {
    try {
      const id = request.params.id;
      const qrCodePath = `./vouchers/voucher_${id}.png`;
      const imagePath = path.join(__dirname, "../..", "public", qrCodePath);

      await fs.readFile(imagePath);
      response.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Error in capture voucher" });
    }
  }

  async getPdf(request, response) {
    try {
      // Define la ruta al archivo QR
      const qrCodePath = `./pdf/documentation.pdf`;
      const imagePath = path.join(__dirname, "../..", "public", qrCodePath);

      // Lee el archivo QR y lo envía como respuesta
      await fs.readFile(imagePath);
      response.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Error in capture voucher" });
    }
  }

  async getImageAdmin(request, response) {
    try {
      // Define la ruta al archivo QR
      const qrCodePath = `./profile-admin/admin.png`;
      const imagePath = path.join(__dirname, "../..", "public", qrCodePath);

      // Lee el archivo QR y lo envía como respuesta
      await fs.readFile(imagePath);
      response.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Error in capture voucher" });
    }
  }
}

export const fileController = new FileController();
