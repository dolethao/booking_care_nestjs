import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from './base.entity';
@Entity('schedules')
export class Schedule extends EntityBase {
  
  @ApiProperty({ description: 'currentNumber' })
  @Column()
  currentNumber: number;

  @ApiProperty({ description: 'maxNumber' })
  @Column()
  maxNumber: number;

  @ApiProperty({ description: 'date' })
  @Column()
  date: string;

  @ApiProperty({ description: 'timeType' })
  @Column()
  timeType: string;

  @ApiProperty({ description: 'doctorId' })
  @Column()
  doctorId: number;

  @ApiProperty({ description: 'doctor' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;
} 