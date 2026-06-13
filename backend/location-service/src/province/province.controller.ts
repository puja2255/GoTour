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

