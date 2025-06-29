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
import { Specialty } from './schemas/specialty.schema';

@ApiTags('specialties')
@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo chuyên khoa mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Specialty })
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả chuyên khoa' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [Specialty] })
  findAll() {
    return this.specialtiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chuyên khoa theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: Specialty })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.specialtiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin chuyên khoa' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Specialty })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtiesService.update(id, updateSpecialtyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa chuyên khoa' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.specialtiesService.remove(id);
  }
} 