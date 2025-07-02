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
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinic } from '../../entities/clinic.entity';

@ApiTags('clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateClinicDto })
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Clinic] })
  findAll() {
    return this.clinicsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Clinic })
  findOne(@Param('id') id: string) {
    const clinicId = parseInt(id);
    return this.clinicsService.findOne(clinicId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UpdateClinicDto })
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    const clinicId = parseInt(id);
    return this.clinicsService.update(clinicId, updateClinicDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    const clinicId = parseInt(id);
    return this.clinicsService.remove(clinicId);
  }
} 