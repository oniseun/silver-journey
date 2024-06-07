import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuestionnaireDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  healthCondition: string;

  @IsOptional()
  @IsString()
  chronicConditionDetails?: string;

  @IsNotEmpty()
  @IsString()
  experiencedSymptoms: string;

  @IsOptional()
  @IsString()
  symptoms?: string;
}
