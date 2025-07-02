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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from '../../entities/schedule.entity';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: CreateScheduleDto })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Thành công', type: [Schedule] })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Thành công', type: Schedule })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    const scheduleId = parseInt(id);
    return this.schedulesService.findOne(scheduleId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: UpdateScheduleDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    const scheduleId = parseInt(id);
    return this.schedulesService.update(scheduleId, updateScheduleDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    const scheduleId = parseInt(id);
    return this.schedulesService.remove(scheduleId);
  }
} 