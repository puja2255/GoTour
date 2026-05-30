import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string }) {
    return this.prisma.category.create({
      data,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }
}
