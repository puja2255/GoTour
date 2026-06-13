import { Controller, Get, Post, Body } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';

@Controller('tour')
export class TourController {
  constructor(private readonly service: TourService) {}

  @Post()
  create(@Body() dto: CreateTourDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateTourDto) {
    return this.service.update(Number(id), dto);
  }
}
