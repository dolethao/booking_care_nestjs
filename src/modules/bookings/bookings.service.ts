import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = this.bookingRepository.create(createBookingDto);
    return this.bookingRepository.save(createdBooking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: ['doctor', 'patient']
    });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient']
    });
    if (!booking) {
      throw new NotFoundException('Booking không tồn tại!');
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException('Booking không tồn tại!');
    }
    
    await this.bookingRepository.update(id, updateBookingDto);
    const updatedBooking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient']
    });
    return updatedBooking!;
  }

  async remove(id: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException('Booking không tồn tại!');
    }
    await this.bookingRepository.delete(id);
  }
} 