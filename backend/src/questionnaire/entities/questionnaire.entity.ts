import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { HealthCondition } from '../../common/enums/health-condition.enum';
import { Gender } from '../../common/enums/gender.enum';
import { YesNo } from '../../common/enums/yes-no.enum';
import * as CryptoJS from 'crypto-js';

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

  @BeforeInsert()
  @BeforeUpdate()
  encryptName() {
    this.name = CryptoJS.AES.encrypt(
      this.name,
      process.env.ENCRYPTION_KEY,
    ).toString();
  }

  decryptName() {
    const bytes = CryptoJS.AES.decrypt(this.name, process.env.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
