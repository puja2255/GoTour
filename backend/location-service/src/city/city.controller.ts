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
