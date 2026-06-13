import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string }) {
    return this.prisma.province.create({
      data,
    });
  }

  findAll() {
    return this.prisma.province.findMany();
  }

  update(id: number, data: { name: string }) {
    return this.prisma.province.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.province.delete({
      where: { id },
    });
  }
}
