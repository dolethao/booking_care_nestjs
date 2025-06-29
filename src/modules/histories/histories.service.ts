import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from './schemas/history.schema';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const createdHistory = new this.historyModel(createHistoryDto);
    return createdHistory.save();
  }

  async findAll(): Promise<History[]> {
    return this.historyModel.find().exec();
  }

  async findOne(id: string): Promise<History> {
    const history = await this.historyModel.findById(id).exec();
    if (!history) {
      throw new NotFoundException('History không tồn tại!');
    }
    return history;
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto): Promise<History> {
    const updatedHistory = await this.historyModel
      .findByIdAndUpdate(id, updateHistoryDto, { new: true })
      .exec();
    if (!updatedHistory) {
      throw new NotFoundException('History không tồn tại!');
    }
    return updatedHistory;
  }

  async remove(id: string): Promise<void> {
    const result = await this.historyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('History không tồn tại!');
    }
  }
} 