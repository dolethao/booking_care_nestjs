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
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from '../../entities/specialty.entity';

@ApiTags('specialties')
@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateSpecialtyDto })
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Specialty] })
  findAll() {
    return this.specialtiesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Specialty })
  findOne(@Param('id') id: string) {
    const specialtyId = parseInt(id);
    return this.specialtiesService.findOne(specialtyId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UpdateSpecialtyDto })
  update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
    const specialtyId = parseInt(id);
    return this.specialtiesService.update(specialtyId, updateSpecialtyDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    const specialtyId = parseInt(id);
    return this.specialtiesService.remove(specialtyId);
  }
} 