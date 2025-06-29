import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialty, SpecialtyDocument } from './schemas/specialty.schema';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectModel(Specialty.name) private specialtyModel: Model<SpecialtyDocument>,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    const createdSpecialty = new this.specialtyModel(createSpecialtyDto);
    return createdSpecialty.save();
  }

  async findAll(): Promise<Specialty[]> {
    return this.specialtyModel.find().exec();
  }

  async findOne(id: string): Promise<Specialty> {
    const specialty = await this.specialtyModel.findById(id).exec();
    if (!specialty) {
      throw new NotFoundException('Specialty không tồn tại!');
    }
    return specialty;
  }

  async update(id: string, updateSpecialtyDto: UpdateSpecialtyDto): Promise<Specialty> {
    const updatedSpecialty = await this.specialtyModel
      .findByIdAndUpdate(id, updateSpecialtyDto, { new: true })
      .exec();
    if (!updatedSpecialty) {
      throw new NotFoundException('Specialty không tồn tại!');
    }
    return updatedSpecialty;
  }

  async remove(id: string): Promise<void> {
    const result = await this.specialtyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Specialty không tồn tại!');
    }
  }
} 