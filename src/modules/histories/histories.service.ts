import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from '../../entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const createdHistory = this.historyRepository.create(createHistoryDto);
    return this.historyRepository.save(createdHistory);
  }

  async findAll(): Promise<History[]> {
    return this.historyRepository.find({
      relations: ['patient', 'doctor']
    });
  }

  async findOne(id: number): Promise<History> {
    const history = await this.historyRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor']
    });
    if (!history) {
      throw new NotFoundException('History không tồn tại!');
    }
    return history;
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto): Promise<History> {
    const history = await this.historyRepository.findOne({ where: { id } });
    if (!history) {
      throw new NotFoundException('History không tồn tại!');
    }
    
    await this.historyRepository.update(id, updateHistoryDto);
    const updatedHistory = await this.historyRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor']
    });
    return updatedHistory!;
  }

  async remove(id: number): Promise<void> {
    const history = await this.historyRepository.findOne({ where: { id } });
    if (!history) {
      throw new NotFoundException('History không tồn tại!');
    }
    await this.historyRepository.delete(id);
  }
} 