import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../common/enums/gender.enum';
import { HealthCondition } from '../../common/enums/health-condition.enum';
import { YesNo } from '../../common/enums/yes-no.enum';

export class QuestionnaireListDto {
  @ApiProperty({
    description: 'The unique identifier of the questionnaire',
    example: 'uuid',
  })
  id: string;

  @ApiProperty({ description: 'The name of the person with masked characters' })
  name: string;

  @ApiProperty({ description: 'The age of the person', example: 30 })
  age: number;

  @ApiProperty({ enum: Gender, description: 'The gender of the person' })
  gender: Gender;

  @ApiProperty({
    enum: HealthCondition,
    description: 'The health condition of the person',
  })
  healthCondition: HealthCondition;

  @ApiProperty({
    enum: YesNo,
    description: 'Whether the person has experienced symptoms',
  })
  experiencedSymptoms: YesNo;

  @ApiProperty({
    description: 'The symptoms experienced by the person',
    example: 'Cough and fever',
    required: false,
  })
  symptoms?: string;

  @ApiProperty({
    description: 'Details about any chronic condition the person has',
    example: 'Diagnosed with chronic arthritis',
    required: false,
  })
  chronicConditionDetails?: string;

  @ApiProperty({ description: 'The date the questionnaire was created' })
  dateCreated: Date;

  @ApiProperty({ description: 'The date the questionnaire was last updated' })
  dateUpdated: Date;

  constructor(partial: Partial<QuestionnaireListDto>) {
    Object.assign(this, partial);
    this.name = this.maskName(this.name);
  }

  private maskName(name: string): string {
    const [firstName, lastName] = name.split(' ');
    if (firstName.length > 2) {
      const middle = firstName.slice(1, -1).replace(/./g, '*');
      return `${firstName[0]}${middle}${firstName.slice(-1)} ${lastName}`;
    }
    return name;
  }
}
