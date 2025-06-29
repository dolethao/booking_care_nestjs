import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkdownsService } from './markdowns.service';
import { MarkdownsController } from './markdowns.controller';
import { Markdown, MarkdownSchema } from './schemas/markdown.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Markdown.name, schema: MarkdownSchema }]),
  ],
  controllers: [MarkdownsController],
  providers: [MarkdownsService],
  exports: [MarkdownsService],
})
export class MarkdownsModule {} 