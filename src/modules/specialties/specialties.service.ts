import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../entities/specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    const createdSpecialty = this.specialtyRepository.create(createSpecialtyDto);
    return this.specialtyRepository.save(createdSpecialty);
  }

  async findAll(): Promise<Specialty[]> {
    return this.specialtyRepository.find();
  }

  async findOne(id: number): Promise<Specialty> {
    const specialty = await this.specialtyRepository.findOne({ where: { id } });
    if (!specialty) {
      throw new NotFoundException('Specialty không tồn tại!');
    }
    return specialty;
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto): Promise<Specialty> {
    const specialty = await this.specialtyRepository.findOne({ where: { id } });
    if (!specialty) {
      throw new NotFoundException('Specialty không tồn tại!');
    }
    
    await this.specialtyRepository.update(id, updateSpecialtyDto);
    const updatedSpecialty = await this.specialtyRepository.findOne({ where: { id } });
    return updatedSpecialty!;
  }

  async remove(id: number): Promise<void> {
    const specialty = await this.specialtyRepository.findOne({ where: { id } });
    if (!specialty) {
      throw new NotFoundException('Specialty không tồn tại!');
    }
    await this.specialtyRepository.delete(id);
  }
} 