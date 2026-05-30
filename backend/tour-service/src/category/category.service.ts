import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CategoryService {
  create(data: { name: string }) {
    return prisma.category.create({
      data,
    });
  }

  findAll() {
    return prisma.category.findMany();
  }
}