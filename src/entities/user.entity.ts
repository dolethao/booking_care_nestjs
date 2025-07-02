import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Allcode } from './allcode.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from './base.entity';

@Entity('users')
export class User extends EntityBase {
  @ApiProperty({ description: 'email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'password' })
  @Column()
  password: string;

  @ApiProperty({ description: 'firstName' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'lastName' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'address', required: false })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({ description: 'phoneNumber', required: false })
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiProperty({ description: 'gender', required: false })
  @Column({ nullable: true })
  gender: string;

  @ApiProperty({ description: 'image', required: false })
  @Column({ nullable: true })
  image: string;

  @ApiProperty({ description: 'roleId', required: false })
  @Column({ nullable: true })
  roleId: number;

  @ApiProperty({ description: 'positionId', required: false })
  @Column({ nullable: true })
  positionId: number;

  @ApiProperty({ description: 'role', required: false })
  @ManyToOne(() => Allcode, { nullable: true })
  @JoinColumn({ name: 'roleId' })
  role: Allcode;

  @ApiProperty({ description: 'position', required: false })
  @ManyToOne(() => Allcode, { nullable: true })
  @JoinColumn({ name: 'positionId' })
  position: Allcode;
} 