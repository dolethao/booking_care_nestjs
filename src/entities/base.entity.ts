import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class EntityBase {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ApiProperty({ description: 'createdAt', required: false })
  @CreateDateColumn()
  public readonly createdAt: Date;

  @ApiProperty({ description: 'updatedAt', required: false })
  @UpdateDateColumn()
  public readonly updatedAt: Date;

  @ApiProperty({ description: 'deletedAt', required: false })
  @DeleteDateColumn()
  public readonly deletedAt: Date;
}
