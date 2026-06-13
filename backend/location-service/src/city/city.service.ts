import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { name: string; provinceId: number }) {
    return this.prisma.city.create({
      data,
    });
  }

  findAll() {
    return this.prisma.city.findMany({
      include: {
        province: true,
      },
    });
  }

  update(id: number, data) {
    return this.prisma.city.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.city.delete({
      where: { id },
    });
  }
}
