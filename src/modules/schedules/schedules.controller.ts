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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from '../../entities/schedule.entity';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateScheduleDto })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Schedule] })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Schedule })
  findOne(@Param('id') id: string) {
    const scheduleId = parseInt(id);
    return this.schedulesService.findOne(scheduleId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UpdateScheduleDto })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    const scheduleId = parseInt(id);
    return this.schedulesService.update(scheduleId, updateScheduleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    const scheduleId = parseInt(id);
    return this.schedulesService.remove(scheduleId);
  }
} 