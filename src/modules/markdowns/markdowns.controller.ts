import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MarkdownsService } from './markdowns.service';
import { CreateMarkdownDto } from './dto/create-markdown.dto';
import { UpdateMarkdownDto } from './dto/update-markdown.dto';
import { Markdown } from '../../entities/markdown.entity';

@ApiTags('markdowns')
@Controller('markdowns')
export class MarkdownsController {
  constructor(private readonly markdownsService: MarkdownsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateMarkdownDto })
  create(@Body() createMarkdownDto: CreateMarkdownDto) {
    return this.markdownsService.create(createMarkdownDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Markdown] })
  findAll() {
    return this.markdownsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Markdown })
  findOne(@Param('id') id: string) {
    const markdownId = parseInt(id);
    return this.markdownsService.findOne(markdownId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UpdateMarkdownDto })
  update(@Param('id') id: string, @Body() updateMarkdownDto: UpdateMarkdownDto) {
    const markdownId = parseInt(id);
    return this.markdownsService.update(markdownId, updateMarkdownDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    const markdownId = parseInt(id);
    return this.markdownsService.remove(markdownId);
  }
} 