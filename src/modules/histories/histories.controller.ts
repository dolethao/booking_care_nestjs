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
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from '../../entities/history.entity';

@ApiTags('histories')
@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateHistoryDto })
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [History] })
  findAll() {
    return this.historiesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: History })
  findOne(@Param('id') id: string) {
    const historyId = parseInt(id);
    return this.historiesService.findOne(historyId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UpdateHistoryDto })
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    const historyId = parseInt(id);
    return this.historiesService.update(historyId, updateHistoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    const historyId = parseInt(id);
    return this.historiesService.remove(historyId);
  }
} 
 