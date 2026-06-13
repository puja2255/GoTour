import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ProvinceService {
  constructor(
    private prisma: PrismaService,
  ) {}
