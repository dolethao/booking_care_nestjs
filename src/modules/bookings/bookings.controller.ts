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
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from '../../entities/booking.entity';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CreateBookingDto })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Booking] })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Booking })
  findOne(@Param('id') id: string) {
    const bookingId = parseInt(id);
    return this.bookingsService.findOne(bookingId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: UpdateBookingDto })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    const bookingId = parseInt(id);
    return this.bookingsService.update(bookingId, updateBookingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    const bookingId = parseInt(id);
    return this.bookingsService.remove(bookingId);
  }
} 