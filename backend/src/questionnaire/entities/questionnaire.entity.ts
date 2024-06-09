import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HealthCondition } from '../../common/enums/health-condition.enum';
import { Gender } from '../../common/enums/gender.enum';
import { YesNo } from '../../common/enums/yes-no.enum';

@Entity()
export class Questionnaire {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  age: number;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: HealthCondition,
  })
  healthCondition: HealthCondition;

  @Column({
    type: 'enum',
    enum: YesNo,
  })
  experiencedSymptoms: YesNo;

  @Column({ nullable: true })
  symptoms?: string;

  @Column({ nullable: true })
  chronicConditionDetails?: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;
}
