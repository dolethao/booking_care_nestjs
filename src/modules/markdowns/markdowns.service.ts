import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Markdown } from '../../entities/markdown.entity';
import { CreateMarkdownDto } from './dto/create-markdown.dto';
import { UpdateMarkdownDto } from './dto/update-markdown.dto';

@Injectable()
export class MarkdownsService {
  constructor(
    @InjectRepository(Markdown)
    private markdownRepository: Repository<Markdown>,
  ) {}

  async create(createMarkdownDto: CreateMarkdownDto): Promise<Markdown> {
    const createdMarkdown = this.markdownRepository.create(createMarkdownDto);
    return this.markdownRepository.save(createdMarkdown);
  }

  async findAll(): Promise<Markdown[]> {
    return this.markdownRepository.find({
      relations: ['doctor', 'specialty', 'clinic']
    });
  }

  async findOne(id: number): Promise<Markdown> {
    const markdown = await this.markdownRepository.findOne({
      where: { id },
      relations: ['doctor', 'specialty', 'clinic']
    });
    if (!markdown) {
      throw new NotFoundException('Markdown không tồn tại!');
    }
    return markdown;
  }

  async update(id: number, updateMarkdownDto: UpdateMarkdownDto): Promise<Markdown> {
    const markdown = await this.markdownRepository.findOne({ where: { id } });
    if (!markdown) {
      throw new NotFoundException('Markdown không tồn tại!');
    }
    
    await this.markdownRepository.update(id, updateMarkdownDto);
    const updatedMarkdown = await this.markdownRepository.findOne({
      where: { id },
      relations: ['doctor', 'specialty', 'clinic']
    });
    return updatedMarkdown!;
  }

  async remove(id: number): Promise<void> {
    const markdown = await this.markdownRepository.findOne({ where: { id } });
    if (!markdown) {
      throw new NotFoundException('Markdown không tồn tại!');
    }
    await this.markdownRepository.delete(id);
  }
} 