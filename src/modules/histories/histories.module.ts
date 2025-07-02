import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { History } from '../../entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
  ],
  controllers: [HistoriesController],
  providers: [HistoriesService],
  exports: [HistoriesService],
})
export class HistoriesModule {} 