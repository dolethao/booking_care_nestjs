import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AllcodesService } from './allcodes.service';
import { AllcodesController } from './allcodes.controller';
import { Allcode, AllcodeSchema } from './schemas/allcode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Allcode.name, schema: AllcodeSchema }]),
  ],
  controllers: [AllcodesController],
  providers: [AllcodesService],
  exports: [AllcodesService],
})
export class AllcodesModule {} 