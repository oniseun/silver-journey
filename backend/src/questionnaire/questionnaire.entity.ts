import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  healthCondition: string;

  @Column({ nullable: true })
  chronicConditionDetails: string;

  @Column()
  experiencedSymptoms: string;

  @Column({ nullable: true })
  symptoms: string;
}
