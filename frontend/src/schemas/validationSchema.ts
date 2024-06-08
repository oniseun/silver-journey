import { object, string, number, enums, refine, optional, size } from 'superstruct';
import { YesNo, HealthCondition, Gender } from '../enums/enums';

const schema = object({
  name: size(string(), 1, 15),
  age: refine(number(), 'PositiveNumber', value => value > 0),
  gender: enums(Object.values(Gender)),
  healthCondition: enums(Object.values(HealthCondition)),
  experiencedSymptoms: enums(Object.values(YesNo)),
  symptoms: refine(optional(string()), 'Symptoms', (value, ctx) => {
    if (ctx.branch[0].experiencedSymptoms === YesNo.Yes && !value) {
      return false;
    }
    return true;
  }),
  chronicConditionDetails: refine(optional(string()), 'ChronicConditionDetails', (value, ctx) => {
    if (ctx.branch[0].healthCondition === HealthCondition.ChronicIllness && !value) {
      return false;
    }
    return true;
  }),
});

export default schema;
