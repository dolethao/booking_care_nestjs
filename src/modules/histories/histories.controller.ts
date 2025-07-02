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
import { History } from '../../entities/history.entity';

@ApiTags('histories')
@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: CreateHistoryDto })
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Thành công', type: [History] })
  findAll() {
    return this.historiesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Thành công', type: History })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    const historyId = parseInt(id);
    return this.historiesService.findOne(historyId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: UpdateHistoryDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    const historyId = parseInt(id);
    return this.historiesService.update(historyId, updateHistoryDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    const historyId = parseInt(id);
    return this.historiesService.remove(historyId);
  }
} 
 