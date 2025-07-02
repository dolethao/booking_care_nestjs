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
import { Booking } from '../../entities/booking.entity';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: CreateBookingDto })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Thành công', type: [Booking] })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Thành công', type: Booking })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    const bookingId = parseInt(id);
    return this.bookingsService.findOne(bookingId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: UpdateBookingDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    const bookingId = parseInt(id);
    return this.bookingsService.update(bookingId, updateBookingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    const bookingId = parseInt(id);
    return this.bookingsService.remove(bookingId);
  }
} 