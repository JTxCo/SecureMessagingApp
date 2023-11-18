import { PrismaClient } from "@prisma/client";

export class SQLiteDBAccess {
  private static instance: SQLiteDBAccess;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }
  public static getInstance(): SQLiteDBAccess {
    if (!SQLiteDBAccess.instance) {
      SQLiteDBAccess.instance = new SQLiteDBAccess();
    }
    return SQLiteDBAccess.instance;
  }
  public getPrismaClient(): PrismaClient {
    return this.prisma;
  }
}
