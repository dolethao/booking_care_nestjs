import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from './base.entity';
@Entity('histories')
export class History extends EntityBase {

  @ApiProperty({ description: 'patientId' })
  @Column()
  patientId: number;

  @ApiProperty({ description: 'doctorId' })
  @Column()
  doctorId: number;

  @ApiProperty({ description: 'description', required: false })
  @Column({ type: 'text', nullable: true })
  description: string;
  
  @ApiProperty({ description: 'files', required: false })
  @Column({ nullable: true })
  files: string;

  @ApiProperty({ description: 'patient' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'patientId' })
  patient: User;

  @ApiProperty({ description: 'doctor' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

} 