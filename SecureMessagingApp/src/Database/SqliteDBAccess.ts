import { PrismaClient } from "@prisma/client";

export class SQLiteDBAccess {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
