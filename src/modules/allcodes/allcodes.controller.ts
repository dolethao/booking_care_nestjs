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
import { AllcodesService } from './allcodes.service';
import { CreateAllcodeDto } from './dto/create-allcode.dto';
import { UpdateAllcodeDto } from './dto/update-allcode.dto';
import { Allcode } from '../../entities/allcode.entity';

@ApiTags('allcodes')
@Controller('allcodes')
export class AllcodesController {
  constructor(private readonly allcodesService: AllcodesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: CreateAllcodeDto })
  create(@Body() createAllcodeDto: CreateAllcodeDto) {
    return this.allcodesService.create(createAllcodeDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Thành công', type: [Allcode] })
  findAll() {
    return this.allcodesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Thành công', type: Allcode })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    const allcodeId = parseInt(id);
    return this.allcodesService.findOne(allcodeId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: UpdateAllcodeDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateAllcodeDto: UpdateAllcodeDto) {
    const allcodeId = parseInt(id);
    return this.allcodesService.update(allcodeId, updateAllcodeDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    const allcodeId = parseInt(id);
    return this.allcodesService.remove(allcodeId);
  }
} 