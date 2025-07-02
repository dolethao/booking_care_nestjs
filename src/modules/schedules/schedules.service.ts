import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const createdSchedule = this.scheduleRepository.create(createScheduleDto);
    return this.scheduleRepository.save(createdSchedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      relations: ['doctor']
    });
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['doctor']
    });
    if (!schedule) {
      throw new NotFoundException('Schedule không tồn tại!');
    }
    return schedule;
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({ where: { id } });
    if (!schedule) {
      throw new NotFoundException('Schedule không tồn tại!');
    }
    
    await this.scheduleRepository.update(id, updateScheduleDto);
    const updatedSchedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['doctor']
    });
    return updatedSchedule!;
  }

  async remove(id: number): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({ where: { id } });
    if (!schedule) {
      throw new NotFoundException('Schedule không tồn tại!');
    }
    await this.scheduleRepository.delete(id);
  }
} 