import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CityService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(data: {
    name: string;
    provinceId: number;
  }) {
    return this.prisma.city.create({
      data,
    });
  }
