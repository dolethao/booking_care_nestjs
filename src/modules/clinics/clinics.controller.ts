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
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinic } from './schemas/clinic.schema';

@ApiTags('clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo phòng khám mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Clinic })
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả phòng khám' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [Clinic] })
  findAll() {
    return this.clinicsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin phòng khám theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: Clinic })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.clinicsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin phòng khám' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Clinic })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicsService.update(id, updateClinicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa phòng khám' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.clinicsService.remove(id);
  }
} 