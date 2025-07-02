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
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from '../../entities/specialty.entity';

@ApiTags('specialties')
@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: CreateSpecialtyDto })
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Thành công', type: [Specialty] })
  findAll() {
    return this.specialtiesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Thành công', type: Specialty })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    const specialtyId = parseInt(id);
    return this.specialtiesService.findOne(specialtyId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: UpdateSpecialtyDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
    const specialtyId = parseInt(id);
    return this.specialtiesService.update(specialtyId, updateSpecialtyDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    const specialtyId = parseInt(id);
    return this.specialtiesService.remove(specialtyId);
  }
} 