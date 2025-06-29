import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException('Booking không tồn tại!');
    }
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const updatedBooking = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, { new: true })
      .exec();
    if (!updatedBooking) {
      throw new NotFoundException('Booking không tồn tại!');
    }
    return updatedBooking;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Booking không tồn tại!');
    }
  }
} 