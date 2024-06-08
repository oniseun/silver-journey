import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireListDto } from './dto/questionnaire-list.dto';
import { Gender } from '../common/enums/gender.enum';
import { HealthCondition } from '../common/enums/health-condition.enum';
import { YesNo } from '../common/enums/yes-no.enum';
import * as CryptoJS from 'crypto-js';
import { validate } from 'class-validator';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;
  let repository: Repository<Questionnaire>;

  beforeEach(() => {
    repository = createMock<Repository<Questionnaire>>();
    service = new QuestionnaireService(repository);
    process.env.ENCRYPTION_KEY = 'testkey';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new questionnaire entry successfully for healthy status with no symptoms', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.No,
    };

    const result = {
      id: 'uuid',
      ...createQuestionnaireDto,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    (repository.save as jest.Mock).mockResolvedValue(result);

    expect(await service.create(createQuestionnaireDto)).toEqual(result);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining(createQuestionnaireDto),
    );
  });

  it('should create a new questionnaire entry successfully for healthy status with symptoms', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.Yes,
      symptoms: 'Cough and fever',
    };

    const result = {
      id: 'uuid',
      ...createQuestionnaireDto,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    (repository.save as jest.Mock).mockResolvedValue(result);

    expect(await service.create(createQuestionnaireDto)).toEqual(result);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining(createQuestionnaireDto),
    );
  });

  it('should create a new questionnaire entry successfully for minor illness with no symptoms', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jane Doe',
      age: 25,
      gender: Gender.Female,
      healthCondition: HealthCondition.MinorIllness,
      experiencedSymptoms: YesNo.No,
    };

    const result = {
      id: 'uuid',
      ...createQuestionnaireDto,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    (repository.save as jest.Mock).mockResolvedValue(result);

    expect(await service.create(createQuestionnaireDto)).toEqual(result);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining(createQuestionnaireDto),
    );
  });

  it('should create a new questionnaire entry successfully for minor illness with symptoms', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jane Doe',
      age: 25,
      gender: Gender.Female,
      healthCondition: HealthCondition.MinorIllness,
      experiencedSymptoms: YesNo.Yes,
      symptoms: 'Headache and nausea',
    };

    const result = {
      id: 'uuid',
      ...createQuestionnaireDto,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    (repository.save as jest.Mock).mockResolvedValue(result);

    expect(await service.create(createQuestionnaireDto)).toEqual(result);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining(createQuestionnaireDto),
    );
  });

  it('should create a new questionnaire entry successfully for chronic illness with symptoms and chronic condition details', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jim Doe',
      age: 40,
      gender: Gender.Diverse,
      healthCondition: HealthCondition.ChronicIllness,
      experiencedSymptoms: YesNo.Yes,
      symptoms: 'Severe back pain',
      chronicConditionDetails: 'Diagnosed with chronic arthritis',
    };

    const result = {
      id: 'uuid',
      ...createQuestionnaireDto,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    (repository.save as jest.Mock).mockResolvedValue(result);

    expect(await service.create(createQuestionnaireDto)).toEqual(result);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining(createQuestionnaireDto),
    );
  });

  it('should show validation errors for all required fields not present', async () => {
    const createQuestionnaireDto: Partial<CreateQuestionnaireDto> = {};

    const errors = await validate(
      createQuestionnaireDto as CreateQuestionnaireDto,
    );
    expect(errors).toHaveLength(5);
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'name',
        constraints: { isNotEmpty: 'Name is required' },
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'age',
        constraints: { isPositive: 'Age must be a positive number' },
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'gender',
        constraints: { isEnum: 'Gender is required' },
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'healthCondition',
        constraints: { isEnum: 'Health condition is required' },
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'experiencedSymptoms',
        constraints: { isEnum: 'Experienced symptoms is required' },
      }),
    );
  });

  it('should validate form for healthy status with symptoms where symptoms is not filled', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.Yes,
    };

    const errors = await validate(createQuestionnaireDto);
    expect(errors).toHaveLength(1);
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'symptoms',
        constraints: { isNotEmpty: 'Please list your symptoms' },
      }),
    );
  });

  it('should validate form for minor illness with symptoms where symptoms is not filled', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jane Doe',
      age: 25,
      gender: Gender.Female,
      healthCondition: HealthCondition.MinorIllness,
      experiencedSymptoms: YesNo.Yes,
    };

    const errors = await validate(createQuestionnaireDto);
    expect(errors).toHaveLength(1);
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'symptoms',
        constraints: { isNotEmpty: 'Please list your symptoms' },
      }),
    );
  });

  it('should validate form for chronic illness where symptoms and chronic conditions are not filled', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jim Doe',
      age: 40,
      gender: Gender.Diverse,
      healthCondition: HealthCondition.ChronicIllness,
      experiencedSymptoms: YesNo.Yes,
    };

    const errors = await validate(createQuestionnaireDto);
    expect(errors).toHaveLength(2);
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'symptoms',
        constraints: { isNotEmpty: 'Please list your symptoms' },
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'chronicConditionDetails',
        constraints: {
          isNotEmpty: 'Please provide details about your chronic illness',
        },
      }),
    );
  });

  it('should return a list of questionnaires with masked names', async () => {
    const encryptedName1 = CryptoJS.AES.encrypt(
      'John Doe',
      process.env.ENCRYPTION_KEY,
    ).toString();
    const encryptedName2 = CryptoJS.AES.encrypt(
      'Jane Smith',
      process.env.ENCRYPTION_KEY,
    ).toString();
    const questionnaires = [
      {
        id: 'uuid1',
        name: encryptedName1,
        age: 30,
        gender: Gender.Male,
        healthCondition: HealthCondition.Healthy,
        experiencedSymptoms: YesNo.No,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
      {
        id: 'uuid2',
        name: encryptedName2,
        age: 25,
        gender: Gender.Female,
        healthCondition: HealthCondition.MinorIllness,
        experiencedSymptoms: YesNo.Yes,
        symptoms: 'Cough',
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
    ];

    (repository.find as jest.Mock).mockResolvedValue(questionnaires);

    const result = await service.findAll();
    expect(result).toEqual([
      new QuestionnaireListDto({
        ...questionnaires[0],
        name: 'J**n Doe',
      }),
      new QuestionnaireListDto({
        ...questionnaires[1],
        name: 'J**e Smith',
      }),
    ]);
    expect(repository.find).toHaveBeenCalled();
  });
});
