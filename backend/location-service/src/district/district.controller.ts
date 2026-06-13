import { Controller, Get, Post, Body } from '@nestjs/common';

import { DistrictService } from './district.service';
@Controller('district')
export class DistrictController {
  constructor(private readonly service: DistrictService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
