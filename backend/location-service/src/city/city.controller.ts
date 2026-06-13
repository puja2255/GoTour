import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { CityService } from './city.service';
@Controller('city')
export class CityController {
  constructor(
    private readonly service: CityService,
  ) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      provinceId: number;
    },
  ) {
    return this.service.create(body);
  }

   @Get()
  findAll() {
    return this.service.findAll();
  }
}
