import { createMock } from '@golevelup/ts-jest';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireListDto } from './dto/questionnaire-list.dto';
import { Gender } from '../common/enums/gender.enum';
import { HealthCondition } from '../common/enums/health-condition.enum';
import { YesNo } from '../common/enums/yes-no.enum';
import * as CryptoJS from 'crypto-js';

describe('QuestionnaireController', () => {
  let controller: QuestionnaireController;
  let service: QuestionnaireService;

  beforeEach(() => {
    service = createMock<QuestionnaireService>();
    controller = new QuestionnaireController(service);
    process.env.ENCRYPTION_KEY = 'testkey';
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new questionnaire entry', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.No,
    };

    const encryptedName = CryptoJS.AES.encrypt(
      createQuestionnaireDto.name,
      process.env.ENCRYPTION_KEY,
    ).toString();
    const result = {
      id: 'uuid',
      ...createQuestionnaireDto,
      name: encryptedName,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    (service.create as jest.Mock).mockResolvedValue(result);

    expect(await controller.create(createQuestionnaireDto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(createQuestionnaireDto);
  });

  it('should return a list of questionnaires with masked names', async () => {
    const decryptedName1 = 'John Doe';
    const decryptedName2 = 'Jane Smith';
    const questionnaires = [
      {
        id: 'uuid1',
        name: decryptedName1,
        age: 30,
        gender: Gender.Male,
        healthCondition: HealthCondition.Healthy,
        experiencedSymptoms: YesNo.No,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
      {
        id: 'uuid2',
        name: decryptedName2,
        age: 25,
        gender: Gender.Female,
        healthCondition: HealthCondition.MinorIllness,
        experiencedSymptoms: YesNo.Yes,
        symptoms: 'Cough',
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
    ];

    const maskedQuestionnaires = questionnaires.map(
      (q) => new QuestionnaireListDto(q),
    );

    (service.findAll as jest.Mock).mockResolvedValue(maskedQuestionnaires);

    expect(await controller.findAll()).toEqual(maskedQuestionnaires);
  });
});
