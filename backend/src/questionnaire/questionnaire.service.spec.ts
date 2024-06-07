import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './questionnaire.entity';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;
  let repository: Repository<Questionnaire>;

  beforeEach(() => {
    repository = createMock<Repository<Questionnaire>>();
    service = new QuestionnaireService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    (repository.save as jest.Mock).mockResolvedValue(result);

    expect(await service.create(createQuestionnaireDto)).toEqual(result);
    expect(repository.save).toHaveBeenCalledWith(createQuestionnaireDto);
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

    (repository.find as jest.Mock).mockResolvedValue(questionnaires);

    expect(await service.findAll()).toEqual(questionnaires);
    expect(repository.find).toHaveBeenCalled();
  });
});
