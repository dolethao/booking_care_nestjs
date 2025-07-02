import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from './base.entity';
@Entity('bookings')
export class Booking extends EntityBase {

  @ApiProperty({ description: 'statusId' })
  @Column()
  statusId: string;

  @ApiProperty({ description: 'doctorId' })
  @Column()
  doctorId: number;

  @ApiProperty({ description: 'patientId' })
  @Column()
  patientId: number;

  @ApiProperty({ description: 'date' })
  @Column()
  date: string;

  @ApiProperty({ description: 'timeType' })
  @Column()
  timeType: string;

  @ApiProperty({ description: 'token', required: false })
  @Column({ nullable: true })
  token: string;
  
  @ApiProperty({ description: 'doctor' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @ApiProperty({ description: 'patient' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'patientId' })
  patient: User;
} 