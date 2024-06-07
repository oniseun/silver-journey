import { createMock } from '@golevelup/ts-jest';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';

describe('QuestionnaireController', () => {
  let controller: QuestionnaireController;
  let service: QuestionnaireService;

  beforeEach(() => {
    service = createMock<QuestionnaireService>();
    controller = new QuestionnaireController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new questionnaire entry', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: 'male',
      healthCondition: 'Healthy',
      experiencedSymptoms: 'no',
    };

    const result = {
      id: 1,
      ...createQuestionnaireDto,
    };

    (service.create as jest.Mock).mockResolvedValue(result);

    expect(await controller.create(createQuestionnaireDto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(createQuestionnaireDto);
  });

  it('should return a list of questionnaires', async () => {
    const questionnaires = [
      {
        id: 1,
        name: 'John Doe',
        age: 30,
        gender: 'male',
        healthCondition: 'Healthy',
        experiencedSymptoms: 'no',
      },
      {
        id: 2,
        name: 'Jane Doe',
        age: 25,
        gender: 'female',
        healthCondition: 'Healthy',
        experiencedSymptoms: 'no',
      },
    ];

    (service.findAll as jest.Mock).mockResolvedValue(questionnaires);

    expect(await controller.findAll()).toEqual(questionnaires);
    expect(service.findAll).toHaveBeenCalled();
  });
});
