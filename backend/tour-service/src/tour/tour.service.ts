import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class TourService {
  create(data) {
    return prisma.tour.create({ data });
  }

  findAll() {
    return prisma.tour.findMany({ include: { category: true } });
  }

  findOne(id: number) {
  return prisma.tour.findUnique({
    where: { id },
    include: { category: true },
  });
}

