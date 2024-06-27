import prisma from "../prisma.js";

class AdminService {
  async findPhone() {
    const { admin } = await prisma.admin.findMany();
    return admin.phone;
  }
}

export const adminService = new AdminService();
