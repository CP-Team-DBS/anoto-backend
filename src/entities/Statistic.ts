import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'statistics' })
export class Statistic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'bool', name: 'is_anxiety' })
  isAnxiety!: boolean;

  @Column({ type: 'varchar', name: 'ip_address', nullable: true })
  ipAddress!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
