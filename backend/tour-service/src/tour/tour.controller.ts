import { Controller, Get, Post, Body } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';

@Controller('tour')
export class TourController {
    constructor(private readonly service: TourService) {}

     @Post()
  create(@Body() dto: CreateTourDto) {
    return this.service.create(dto);
  }
}
