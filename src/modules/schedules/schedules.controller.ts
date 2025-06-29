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
import { Schedule } from './schemas/schedule.schema';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo lịch hẹn mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Schedule })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả lịch hẹn' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [Schedule] })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin lịch hẹn theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: Schedule })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin lịch hẹn' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Schedule })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa lịch hẹn' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }
} 