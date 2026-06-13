import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { DistrictService } from './district.service';
@Controller('district')
export class DistrictController {
  constructor(
    private readonly service: DistrictService,
  ) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      cityId: number;
    },
  ) {
    return this.service.create(body);
  }

    @Get()
  findAll() {
    return this.service.findAll();
  }
}
