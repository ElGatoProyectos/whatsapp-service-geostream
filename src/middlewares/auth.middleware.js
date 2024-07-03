import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import "dotenv/config";

class AuthMiddleware {
  async validateAuthorizationUser(request, response, nextFunction) {
    try {
      const token = request.get("Authorization");

      const responseToken = jwt.verify(
        token,
        process.env.TOKEN_SECRET_VALIDATION_NOTIFICATION || ""
      );

      const { userSession, codeValidation } = responseToken;

      const user = await prisma.user.findFirst({
        where: { id: userSession.id },
      });

      const [admin] = await prisma.admin.findMany();

      // pending validation code

      if (user || admin) nextFunction();

      response
        .status(401)
        .json({ message: "Error in validating authorization" });
    } catch (error) {
      response
        .status(401)
        .json({ message: "Error in validating authorization" });
    }
  }

  async validateAuthorizationAdmin(request, response, nextFunction) {
    try {
      const token = request.get("Authorization");
      if (token) {
        nextFunction();
      } else {
        response
          .status(401)
          .json({ message: "Error in validating authorization" });
      }
    } catch (error) {
      response
        .status(401)
        .json({ message: "Error in validating authorization" });
    }
  }
}

export const authMiddleware = new AuthMiddleware();
