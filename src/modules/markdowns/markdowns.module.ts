import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkdownsService } from './markdowns.service';
import { MarkdownsController } from './markdowns.controller';
import { Markdown } from '../../entities/markdown.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Markdown]),
  ],
  controllers: [MarkdownsController],
  providers: [MarkdownsService],
  exports: [MarkdownsService],
})
export class MarkdownsModule {} 