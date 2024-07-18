class AdminService {
  async findPhone() {
    const { admin } = await prisma.admin.findMany();
    return admin;
  }
}

export const adminService = new AdminService();
