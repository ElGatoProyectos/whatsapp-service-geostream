import {
  BuyInRequestSchema,
  notificationSchema,
} from "../schemas/notification.schema.js";

class NotificationMiddleware {
  async validateBody(request, response, nextFunction) {
    try {
      const body = request.body;
      const { error } = notificationSchema.validate(body);
      if (error) response.json();
      nextFunction();
    } catch (error) {
      response.json({});
    }
  }

  async validateBuyInRequest(request, response, nextFunction) {
    try {
      const body = request.body;
      const { error } = BuyInRequestSchema.validate(body);
      if (error) response.json();
      nextFunction();
    } catch (error) {
      response.json({});
    }
  }
}

export const notificationMiddleware = new NotificationMiddleware();
