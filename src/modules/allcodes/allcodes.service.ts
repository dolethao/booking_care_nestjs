import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allcode } from '../../entities/allcode.entity';
import { CreateAllcodeDto } from './dto/create-allcode.dto';
import { UpdateAllcodeDto } from './dto/update-allcode.dto';

@Injectable()
export class AllcodesService {
  constructor(
    @InjectRepository(Allcode)
    private allcodeRepository: Repository<Allcode>,
  ) {}

  async create(createAllcodeDto: CreateAllcodeDto): Promise<Allcode> {
    const createdAllcode = this.allcodeRepository.create(createAllcodeDto);
    return this.allcodeRepository.save(createdAllcode);
  }

  async findAll(): Promise<Allcode[]> {
    return this.allcodeRepository.find();
  }

  async findOne(id: number): Promise<Allcode> {
    const allcode = await this.allcodeRepository.findOne({ where: { id } });
    if (!allcode) {
      throw new NotFoundException('Allcode không tồn tại!');
    }
    return allcode;
  }

  async update(id: number, updateAllcodeDto: UpdateAllcodeDto): Promise<Allcode> {
    const allcode = await this.allcodeRepository.findOne({ where: { id } });
    if (!allcode) {
      throw new NotFoundException('Allcode không tồn tại!');
    }
    
    await this.allcodeRepository.update(id, updateAllcodeDto);
    const updatedAllcode = await this.allcodeRepository.findOne({ where: { id } });
    return updatedAllcode!;
  }

  async remove(id: number): Promise<void> {
    const allcode = await this.allcodeRepository.findOne({ where: { id } });
    if (!allcode) {
      throw new NotFoundException('Allcode không tồn tại!');
    }
    await this.allcodeRepository.delete(id);
  }
} 