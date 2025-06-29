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
import { Allcode } from './schemas/allcode.schema';

@ApiTags('allcodes')
@Controller('allcodes')
export class AllcodesController {
  constructor(private readonly allcodesService: AllcodesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mã code mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Allcode })
  create(@Body() createAllcodeDto: CreateAllcodeDto) {
    return this.allcodesService.create(createAllcodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả mã code' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [Allcode] })
  findAll() {
    return this.allcodesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin mã code theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: Allcode })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.allcodesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin mã code' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Allcode })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateAllcodeDto: UpdateAllcodeDto) {
    return this.allcodesService.update(id, updateAllcodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa mã code' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.allcodesService.remove(id);
  }
} 