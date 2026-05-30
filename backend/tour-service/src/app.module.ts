import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourModule } from './tour/tour.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TourModule, CategoryModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
