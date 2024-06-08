import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
  Length,
} from 'class-validator';
import { Gender } from '../../common/enums/gender.enum';
import { HealthCondition } from '../../common/enums/health-condition.enum';
import { YesNo } from '../../common/enums/yes-no.enum';

export class CreateQuestionnaireDto {
  @IsString({ message: 'Name is required' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(1, 15, { message: 'Name must be between 1 and 15 characters' })
  name: string;

  @IsPositive({ message: 'Age must be a positive number' })
  age: number;

  @IsEnum(Gender, { message: 'Gender is required' })
  gender: Gender;

  @IsEnum(HealthCondition, { message: 'Health condition is required' })
  healthCondition: HealthCondition;

  @IsEnum(YesNo, { message: 'Experienced symptoms is required' })
  experiencedSymptoms: YesNo;

  @ValidateIf((o) => o.experiencedSymptoms === YesNo.Yes)
  @IsNotEmpty({ message: 'Please list your symptoms' })
  @IsString({ message: 'Please list your symptoms' })
  symptoms?: string;

  @ValidateIf((o) => o.healthCondition === HealthCondition.ChronicIllness)
  @IsNotEmpty({ message: 'Please provide details about your chronic illness' })
  @IsString({ message: 'Please provide details about your chronic illness' })
  chronicConditionDetails?: string;
}
