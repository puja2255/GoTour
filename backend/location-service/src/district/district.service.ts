import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class DistrictService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

   create(data: {
    name: string;
    cityId: number;
  }) {
    return this.prisma.district.create({
      data,
    });
  }
