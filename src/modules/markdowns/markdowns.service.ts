import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Markdown, MarkdownDocument } from './schemas/markdown.schema';
import { CreateMarkdownDto } from './dto/create-markdown.dto';
import { UpdateMarkdownDto } from './dto/update-markdown.dto';

@Injectable()
export class MarkdownsService {
  constructor(
    @InjectModel(Markdown.name) private markdownModel: Model<MarkdownDocument>,
  ) {}

  async create(createMarkdownDto: CreateMarkdownDto): Promise<Markdown> {
    const createdMarkdown = new this.markdownModel(createMarkdownDto);
    return createdMarkdown.save();
  }

  async findAll(): Promise<Markdown[]> {
    return this.markdownModel.find().exec();
  }

  async findOne(id: string): Promise<Markdown> {
    const markdown = await this.markdownModel.findById(id).exec();
    if (!markdown) {
      throw new NotFoundException('Markdown không tồn tại!');
    }
    return markdown;
  }

  async update(id: string, updateMarkdownDto: UpdateMarkdownDto): Promise<Markdown> {
    const updatedMarkdown = await this.markdownModel
      .findByIdAndUpdate(id, updateMarkdownDto, { new: true })
      .exec();
    if (!updatedMarkdown) {
      throw new NotFoundException('Markdown không tồn tại!');
    }
    return updatedMarkdown;
  }

  async remove(id: string): Promise<void> {
    const result = await this.markdownModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Markdown không tồn tại!');
    }
  }
} 