import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Allcode, AllcodeDocument } from './schemas/allcode.schema';
import { CreateAllcodeDto } from './dto/create-allcode.dto';
import { UpdateAllcodeDto } from './dto/update-allcode.dto';

@Injectable()
export class AllcodesService {
  constructor(
    @InjectModel(Allcode.name) private allcodeModel: Model<AllcodeDocument>,
  ) {}

  async create(createAllcodeDto: CreateAllcodeDto): Promise<Allcode> {
    const createdAllcode = new this.allcodeModel(createAllcodeDto);
    return createdAllcode.save();
  }

  async findAll(): Promise<Allcode[]> {
    return this.allcodeModel.find().exec();
  }

  async findOne(id: string): Promise<Allcode> {
    const allcode = await this.allcodeModel.findById(id).exec();
    if (!allcode) {
      throw new NotFoundException('Allcode không tồn tại!');
    }
    return allcode;
  }

  async update(id: string, updateAllcodeDto: UpdateAllcodeDto): Promise<Allcode> {
    const updatedAllcode = await this.allcodeModel
      .findByIdAndUpdate(id, updateAllcodeDto, { new: true })
      .exec();
    if (!updatedAllcode) {
      throw new NotFoundException('Allcode không tồn tại!');
    }
    return updatedAllcode;
  }

  async remove(id: string): Promise<void> {
    const result = await this.allcodeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Allcode không tồn tại!');
    }
  }
} 