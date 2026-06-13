import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { DistrictModule } from './district/district.module';

@Module({
  imports: [ProvinceModule, CityModule, DistrictModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
