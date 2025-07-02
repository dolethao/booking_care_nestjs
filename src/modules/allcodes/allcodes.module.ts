import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllcodesService } from './allcodes.service';
import { AllcodesController } from './allcodes.controller';
import { Allcode } from '../../entities/allcode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Allcode]),
  ],
  controllers: [AllcodesController],
  providers: [AllcodesService],
  exports: [AllcodesService],
})
export class AllcodesModule {} 