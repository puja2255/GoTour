import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ProvinceService {
  constructor(
    private prisma: PrismaService,
  ) {}

    create(data: { name: string }) {
    return this.prisma.province.create({
      data,
    });
  }

    findAll() {
    return this.prisma.province.findMany();
  }
}
