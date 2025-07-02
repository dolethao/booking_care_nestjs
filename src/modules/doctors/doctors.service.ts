import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const createdDoctor = this.doctorRepository.create(createDoctorDto);
    return this.doctorRepository.save(createdDoctor);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({
      relations: ['doctor', 'specialty', 'clinic']
    });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['doctor', 'specialty', 'clinic']
    });
    if (!doctor) {
      throw new NotFoundException('Doctor không tồn tại!');
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor không tồn tại!');
    }
    
    await this.doctorRepository.update(id, updateDoctorDto);
    const updatedDoctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['doctor', 'specialty', 'clinic']
    });
    return updatedDoctor!;
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor không tồn tại!');
    }
    await this.doctorRepository.delete(id);
  }
} 