import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { ProvinceService } from './province.service';
@Controller('province')
export class ProvinceController {}
@Controller('province')
export class ProvinceController {
  constructor(
    private readonly service: ProvinceService,
  ) {}

  @Post()
  create(
    @Body() body: { name: string },
  ) {
    return this.service.create(body);
  }

   @Get()
  findAll() {
    return this.service.findAll();
  }
}

