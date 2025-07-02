import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Specialty } from './specialty.entity';
import { Clinic } from './clinic.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from './base.entity';
@Entity('markdowns')
export class Markdown extends EntityBase {

  @ApiProperty({ description: 'contentHTML' })
  @Column({ type: 'text' })
  contentHTML: string;

  @ApiProperty({ description: 'contentMarkdown' })
  @Column({ type: 'text' })
  contentMarkdown: string;

  @ApiProperty({ description: 'description', required: false })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'doctorId', required: false })
  @Column({ nullable: true })
  doctorId: number;

  @ApiProperty({ description: 'specialtyId', required: false })
  @Column({ nullable: true })
  specialtyId: number;

  @ApiProperty({ description: 'clinicId', required: false })
  @Column({ nullable: true })
  clinicId: number;

  @ApiProperty({ description: 'doctor', required: false })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @ApiProperty({ description: 'specialty', required: false })
  @ManyToOne(() => Specialty, { nullable: true })
  @JoinColumn({ name: 'specialtyId' })
  specialty: Specialty;

  @ApiProperty({ description: 'clinic', required: false })
  @ManyToOne(() => Clinic, { nullable: true })
  @JoinColumn({ name: 'clinicId' })
  clinic: Clinic;
} 