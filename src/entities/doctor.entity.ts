import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Specialty } from './specialty.entity';
import { Clinic } from './clinic.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from './base.entity';
@Entity('doctors')
export class Doctor extends EntityBase {

  @ApiProperty({ description: 'doctorId' })
  @Column()
  doctorId: number;

  @ApiProperty({ description: 'specialtyId', required: false })
  @Column({ nullable: true })
  specialtyId: number;

  @ApiProperty({ description: 'clinicId', required: false })
  @Column({ nullable: true })
  clinicId: number;

  @ApiProperty({ description: 'priceId', required: false })
  @Column({ nullable: true })
  priceId: string;

  @ApiProperty({ description: 'provinceId', required: false })
  @Column({ nullable: true })
  provinceId: string;

  @ApiProperty({ description: 'paymentId', required: false })
  @Column({ nullable: true })
  paymentId: string;

  @ApiProperty({ description: 'addressClinic', required: false })
  @Column({ nullable: true })
  addressClinic: string;

  @ApiProperty({ description: 'nameCilinic', required: false })
  @Column({ nullable: true })
  nameCilinic: string;
  
  @ApiProperty({ description: 'note', required: false })
  @Column({ nullable: true })
  note: string;

  @ApiProperty({ description: 'count' })
  @Column({ default: 0 })
  count: number;
  
  @ApiProperty({ description: 'doctor' })
  @ManyToOne(() => User)
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