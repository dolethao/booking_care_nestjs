import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schemas/schedule.schema';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const createdSchedule = new this.scheduleModel(createScheduleDto);
    return createdSchedule.save();
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleModel.find().exec();
  }

  async findOne(id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(id).exec();
    if (!schedule) {
      throw new NotFoundException('Schedule không tồn tại!');
    }
    return schedule;
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    const updatedSchedule = await this.scheduleModel
      .findByIdAndUpdate(id, updateScheduleDto, { new: true })
      .exec();
    if (!updatedSchedule) {
      throw new NotFoundException('Schedule không tồn tại!');
    }
    return updatedSchedule;
  }

  async remove(id: string): Promise<void> {
    const result = await this.scheduleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Schedule không tồn tại!');
    }
  }
} 