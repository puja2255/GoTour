import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService, PrismaService],
})
export class DistrictModule {}
