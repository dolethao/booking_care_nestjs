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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './schemas/doctor.schema';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo thông tin bác sĩ mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Doctor })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả bác sĩ' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [Doctor] })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin bác sĩ theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: Doctor })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin bác sĩ' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Doctor })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bác sĩ' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
} 