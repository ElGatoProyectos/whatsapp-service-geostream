import jwt from "jsonwebtoken";
import prisma from "../prisma";
import "dotenv/config";

class AuthMiddleware {
  async validateAuthorization(request, response, nextFunction) {
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

      // pending validation code

      if (!user)
        response
          .status(401)
          .json({ message: "Error in validating authorization" });

      nextFunction();
    } catch (error) {
      response
        .status(401)
        .json({ message: "Error in validating authorization" });
    }
  }
}

export const authMiddleware = new AuthMiddleware();
