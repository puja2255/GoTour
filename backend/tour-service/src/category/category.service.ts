import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
