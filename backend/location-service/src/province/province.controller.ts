import { Controller, Get, Post, Body } from '@nestjs/common';

import { ProvinceService } from './province.service';
@Controller('province')
export class ProvinceController {}
@Controller('province')
export class provinceController {
  constructor(private readonly service: ProvinceService) {}

  @Post()
  create(@Body() body: { name: string }) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
