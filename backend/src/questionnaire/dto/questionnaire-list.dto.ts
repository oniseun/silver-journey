import { HealthCondition } from '../../common/enums/health-condition.enum';
import { Gender } from '../../common/enums/gender.enum';
import { YesNo } from '../../common/enums/yes-no.enum';
import { Questionnaire } from '../entities/questionnaire.entity';

export class QuestionnaireListDto {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  healthCondition: HealthCondition;
  experiencedSymptoms: YesNo;
  symptoms?: string;
  chronicConditionDetails?: string;
  dateCreated: Date;
  dateUpdated: Date;

  constructor(partial: Partial<Questionnaire>) {
    Object.assign(this, partial);
    this.name = this.maskName(partial.name);
  }

  private maskName(name: string): string {
    const [firstName, lastName] = name.split(' ');

    if (firstName.length <= 2) {
      return `${firstName.charAt(0)}* ${lastName}`;
    }

    const maskedFirstName =
      firstName.charAt(0) +
      '*'.repeat(firstName.length - 2) +
      firstName.charAt(firstName.length - 1);
    return `${maskedFirstName} ${lastName}`;
  }
}
