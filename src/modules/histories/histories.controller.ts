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
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './schemas/history.schema';

@ApiTags('histories')
@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo lịch sử mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: History })
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả lịch sử' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [History] })
  findAll() {
    return this.historiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin lịch sử theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: History })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.historiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin lịch sử' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: History })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa lịch sử' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.historiesService.remove(id);
  }
} 
 