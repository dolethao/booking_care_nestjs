import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from './base.entity';
@Entity('clinics')
export class Clinic extends EntityBase {
  
  @ApiProperty({ description: 'name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'address', required: false })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({ description: 'descriptionHTML', required: false })
  @Column({ type: 'text', nullable: true })
  descriptionHTML: string;

  @ApiProperty({ description: 'descriptionMarkdown', required: false })
  @Column({ type: 'text', nullable: true })
  descriptionMarkdown: string;

  @ApiProperty({ description: 'image', required: false })
  @Column({ nullable: true })
  image: string;
} 