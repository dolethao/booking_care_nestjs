import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from '../../entities/clinic.entity';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
  ) {}

  async create(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const createdClinic = this.clinicRepository.create(createClinicDto);
    return this.clinicRepository.save(createdClinic);
  }

  async findAll(): Promise<Clinic[]> {
    return this.clinicRepository.find();
  }

  async findOne(id: number): Promise<Clinic> {
    const clinic = await this.clinicRepository.findOne({ where: { id } });
    if (!clinic) {
      throw new NotFoundException('Clinic không tồn tại!');
    }
    return clinic;
  }

  async update(id: number, updateClinicDto: UpdateClinicDto): Promise<Clinic> {
    const clinic = await this.clinicRepository.findOne({ where: { id } });
    if (!clinic) {
      throw new NotFoundException('Clinic không tồn tại!');
    }
    
    await this.clinicRepository.update(id, updateClinicDto);
    const updatedClinic = await this.clinicRepository.findOne({ where: { id } });
    return updatedClinic!;
  }

  async remove(id: number): Promise<void> {
    const clinic = await this.clinicRepository.findOne({ where: { id } });
    if (!clinic) {
      throw new NotFoundException('Clinic không tồn tại!');
    }
    await this.clinicRepository.delete(id);
  }
} 