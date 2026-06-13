import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';

import { CityService } from './city.service';
@Controller('city')
export class CityController {
  constructor(private readonly service: CityService) {}

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

  @Patch (':id')
  update(@Param('id') id: string, @Body() body) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
