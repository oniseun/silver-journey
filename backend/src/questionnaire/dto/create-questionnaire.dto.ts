import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateIf,
  Length,
} from 'class-validator';
import { Gender } from '../../common/enums/gender.enum';
import { HealthCondition } from '../../common/enums/health-condition.enum';
import { YesNo } from '../../common/enums/yes-no.enum';

export class CreateQuestionnaireDto {
  @ApiProperty({ description: 'The name of the person', example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ description: 'The age of the person', example: 30 })
  @IsPositive({ message: 'Age must be a positive number' })
  age: number;

  @ApiProperty({ enum: Gender, description: 'The gender of the person' })
  @IsEnum(Gender, { message: 'Gender is required' })
  gender: Gender;

  @ApiProperty({
    enum: HealthCondition,
    description: 'The health condition of the person',
  })
  @IsEnum(HealthCondition, { message: 'Health condition is required' })
  healthCondition: HealthCondition;

  @ApiProperty({
    enum: YesNo,
    description: 'Whether the person has experienced symptoms',
  })
  @IsEnum(YesNo, { message: 'Experienced symptoms is required' })
  experiencedSymptoms: YesNo;

  @ApiProperty({
    description: 'The symptoms experienced by the person',
    example: 'Cough and fever',
    required: false,
  })
  @ValidateIf((o) => o.experiencedSymptoms === YesNo.Yes)
  @IsNotEmpty({ message: 'Please list your symptoms' })
  @IsString({ message: 'Please list your symptoms' })
  symptoms?: string;

  @ApiProperty({
    description: 'Details about any chronic condition the person has',
    example: 'Diagnosed with chronic arthritis',
    required: false,
  })
  @ValidateIf((o) => o.healthCondition === HealthCondition.ChronicIllness)
  @IsNotEmpty({ message: 'Please provide details about your chronic illness' })
  @IsString({ message: 'Please provide details about your chronic illness' })
  chronicConditionDetails?: string;
}
