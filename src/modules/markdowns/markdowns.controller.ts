import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MarkdownsService } from './markdowns.service';
import { CreateMarkdownDto } from './dto/create-markdown.dto';
import { UpdateMarkdownDto } from './dto/update-markdown.dto';
import { Markdown } from '../../entities/markdown.entity';

@ApiTags('markdowns')
@Controller('markdowns')
export class MarkdownsController {
  constructor(private readonly markdownsService: MarkdownsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: CreateMarkdownDto })
  create(@Body() createMarkdownDto: CreateMarkdownDto) {
    return this.markdownsService.create(createMarkdownDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Thành công', type: [Markdown] })
  findAll() {
    return this.markdownsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Thành công', type: Markdown })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    const markdownId = parseInt(id);
    return this.markdownsService.findOne(markdownId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: UpdateMarkdownDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateMarkdownDto: UpdateMarkdownDto) {
    const markdownId = parseInt(id);
    return this.markdownsService.update(markdownId, updateMarkdownDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    const markdownId = parseInt(id);
    return this.markdownsService.remove(markdownId);
  }
} 