import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from './base.entity';
@Entity('allcodes')
export class Allcode extends EntityBase {
  @ApiProperty({ description: 'type' })
  @Column()
  type: string;

  @ApiProperty({ description: 'valueEn', required: false })
  @Column({ nullable: true })
  valueEn: string;

  @ApiProperty({ description: 'valueVi', required: false })
  @Column({ nullable: true })
  valueVi: string;
} 