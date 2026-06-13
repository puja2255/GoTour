import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class DistrictService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { name: string; cityId: number }) {
    return this.prisma.district.create({
      data,
    });
  }

  findAll() {
    return this.prisma.district.findMany({
      include: {
        city: true,
      },
    });
  }

  update(id: number, data) {
    return this.prisma.district.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.district.delete({
      where: { id },
    });
  }
}
