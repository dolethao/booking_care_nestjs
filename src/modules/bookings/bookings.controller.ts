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
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './schemas/booking.schema';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo đặt lịch mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Booking })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả đặt lịch' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [Booking] })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin đặt lịch theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: Booking })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin đặt lịch' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Booking })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đặt lịch' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
} 