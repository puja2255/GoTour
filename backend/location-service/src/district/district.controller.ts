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
