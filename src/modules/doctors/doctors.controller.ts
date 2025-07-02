import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateDoctorDto })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Doctor] })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Doctor })
  findOne(@Param('id') id: string) {
    const doctorId = parseInt(id);
    return this.doctorsService.findOne(doctorId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UpdateDoctorDto })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    const doctorId = parseInt(id);
    return this.doctorsService.update(doctorId, updateDoctorDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    const doctorId = parseInt(id);
    return this.doctorsService.remove(doctorId);
  }
} 