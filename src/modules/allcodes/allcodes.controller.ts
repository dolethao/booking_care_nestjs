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
import { AllcodesService } from './allcodes.service';
import { CreateAllcodeDto } from './dto/create-allcode.dto';
import { UpdateAllcodeDto } from './dto/update-allcode.dto';
import { Allcode } from '../../entities/allcode.entity';

@ApiTags('allcodes')
@Controller('allcodes')
export class AllcodesController {
  constructor(private readonly allcodesService: AllcodesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateAllcodeDto })
  create(@Body() createAllcodeDto: CreateAllcodeDto) {
    return this.allcodesService.create(createAllcodeDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Allcode] })
  findAll() {
    return this.allcodesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Allcode })
  findOne(@Param('id') id: string) {
    const allcodeId = parseInt(id);
    return this.allcodesService.findOne(allcodeId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UpdateAllcodeDto })
  update(@Param('id') id: string, @Body() updateAllcodeDto: UpdateAllcodeDto) {
    const allcodeId = parseInt(id);
    return this.allcodesService.update(allcodeId, updateAllcodeDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    const allcodeId = parseInt(id);
    return this.allcodesService.remove(allcodeId);
  }
} 