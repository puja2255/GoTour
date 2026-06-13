import { Module } from '@nestjs/common';

import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { DistrictModule } from './district/district.module';

@Module({
  imports: [ProvinceModule, CityModule, DistrictModule],
})
export class AppModule {}
