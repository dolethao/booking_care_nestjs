import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clinic, ClinicDocument } from './schemas/clinic.schema';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectModel(Clinic.name) private clinicModel: Model<ClinicDocument>,
  ) {}

  async create(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const createdClinic = new this.clinicModel(createClinicDto);
    return createdClinic.save();
  }

  async findAll(): Promise<Clinic[]> {
    return this.clinicModel.find().exec();
  }

  async findOne(id: string): Promise<Clinic> {
    const clinic = await this.clinicModel.findById(id).exec();
    if (!clinic) {
      throw new NotFoundException('Clinic không tồn tại!');
    }
    return clinic;
  }

  async update(id: string, updateClinicDto: UpdateClinicDto): Promise<Clinic> {
    const updatedClinic = await this.clinicModel
      .findByIdAndUpdate(id, updateClinicDto, { new: true })
      .exec();
    if (!updatedClinic) {
      throw new NotFoundException('Clinic không tồn tại!');
    }
    return updatedClinic;
  }

  async remove(id: string): Promise<void> {
    const result = await this.clinicModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Clinic không tồn tại!');
    }
  }
} 