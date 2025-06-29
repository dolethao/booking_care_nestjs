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
import { Markdown } from './schemas/markdown.schema';

@ApiTags('markdowns')
@Controller('markdowns')
export class MarkdownsController {
  constructor(private readonly markdownsService: MarkdownsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo markdown mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Markdown })
  create(@Body() createMarkdownDto: CreateMarkdownDto) {
    return this.markdownsService.create(createMarkdownDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả markdown' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [Markdown] })
  findAll() {
    return this.markdownsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin markdown theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: Markdown })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.markdownsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin markdown' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Markdown })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateMarkdownDto: UpdateMarkdownDto) {
    return this.markdownsService.update(id, updateMarkdownDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa markdown' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.markdownsService.remove(id);
  }
} 