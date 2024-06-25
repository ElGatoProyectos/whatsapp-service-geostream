class AuthMiddleware {
  async validateAuthorization(request, response, nextFunction) {
    try {
      const token = request.get("Authorization");
      // validate token

      nextFunction();
    } catch (error) {}
  }
}

export const authMiddleware = new AuthMiddleware();
