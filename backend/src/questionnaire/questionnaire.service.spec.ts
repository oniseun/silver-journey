import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { Gender } from '../common/enums/gender.enum';
import { HealthCondition } from '../common/enums/health-condition.enum';
import { YesNo } from '../common/enums/yes-no.enum';
import * as CryptoJS from 'crypto-js';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;
  let repository: Repository<Questionnaire>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionnaireService,
        {
          provide: getRepositoryToken(Questionnaire),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<QuestionnaireService>(QuestionnaireService);
    repository = module.get<Repository<Questionnaire>>(
      getRepositoryToken(Questionnaire),
    );
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

    const encryptedName = CryptoJS.AES.encrypt(
      createQuestionnaireDto.name,
      process.env.ENCRYPTION_KEY,
    ).toString();
    const savedQuestionnaire = {
      id: 'uuid',
      ...createQuestionnaireDto,
      name: encryptedName,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    jest.spyOn(repository, 'create').mockReturnValue(savedQuestionnaire as any);
    jest.spyOn(repository, 'save').mockResolvedValue(savedQuestionnaire as any);

    const result = await service.create(createQuestionnaireDto);
    expect(result).toEqual(savedQuestionnaire);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        ...createQuestionnaireDto,
        name: encryptedName,
      }),
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

    const encryptedName = CryptoJS.AES.encrypt(
      createQuestionnaireDto.name,
      process.env.ENCRYPTION_KEY,
    ).toString();
    const savedQuestionnaire = {
      id: 'uuid',
      ...createQuestionnaireDto,
      name: encryptedName,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    jest.spyOn(repository, 'create').mockReturnValue(savedQuestionnaire as any);
    jest.spyOn(repository, 'save').mockResolvedValue(savedQuestionnaire as any);

    const result = await service.create(createQuestionnaireDto);
    expect(result).toEqual(savedQuestionnaire);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        ...createQuestionnaireDto,
        name: encryptedName,
      }),
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

    const encryptedName = CryptoJS.AES.encrypt(
      createQuestionnaireDto.name,
      process.env.ENCRYPTION_KEY,
    ).toString();
    const savedQuestionnaire = {
      id: 'uuid',
      ...createQuestionnaireDto,
      name: encryptedName,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    jest.spyOn(repository, 'create').mockReturnValue(savedQuestionnaire as any);
    jest.spyOn(repository, 'save').mockResolvedValue(savedQuestionnaire as any);

    const result = await service.create(createQuestionnaireDto);
    expect(result).toEqual(savedQuestionnaire);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        ...createQuestionnaireDto,
        name: encryptedName,
      }),
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

    const encryptedName = CryptoJS.AES.encrypt(
      createQuestionnaireDto.name,
      process.env.ENCRYPTION_KEY,
    ).toString();
    const savedQuestionnaire = {
      id: 'uuid',
      ...createQuestionnaireDto,
      name: encryptedName,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    jest.spyOn(repository, 'create').mockReturnValue(savedQuestionnaire as any);
    jest.spyOn(repository, 'save').mockResolvedValue(savedQuestionnaire as any);

    const result = await service.create(createQuestionnaireDto);
    expect(result).toEqual(savedQuestionnaire);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        ...createQuestionnaireDto,
        name: encryptedName,
      }),
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

    const encryptedName = CryptoJS.AES.encrypt(
      createQuestionnaireDto.name,
      process.env.ENCRYPTION_KEY,
    ).toString();
    const savedQuestionnaire = {
      id: 'uuid',
      ...createQuestionnaireDto,
      name: encryptedName,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    jest.spyOn(repository, 'create').mockReturnValue(savedQuestionnaire as any);
    jest.spyOn(repository, 'save').mockResolvedValue(savedQuestionnaire as any);

    const result = await service.create(createQuestionnaireDto);
    expect(result).toEqual(savedQuestionnaire);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        ...createQuestionnaireDto,
        name: encryptedName,
      }),
    );
  });

  it('should show validation errors for all required fields not present', async () => {
    const createQuestionnaireDto: Partial<CreateQuestionnaireDto> = {};

    const errors = await validate(
      plainToInstance(
        CreateQuestionnaireDto,
        createQuestionnaireDto,
      ) as CreateQuestionnaireDto,
    );
    expect(errors).toHaveLength(5);
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'name',
        constraints: expect.objectContaining({
          isNotEmpty: 'Name is required',
          isString: 'name must be a string',
        }),
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'age',
        constraints: expect.objectContaining({
          isPositive: 'Age must be a positive number',
        }),
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'gender',
        constraints: expect.objectContaining({
          isEnum: 'Gender is required',
        }),
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'healthCondition',
        constraints: expect.objectContaining({
          isEnum: 'Health condition is required',
        }),
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'experiencedSymptoms',
        constraints: expect.objectContaining({
          isEnum: 'Experienced symptoms is required',
        }),
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

    const errors = await validate(
      plainToInstance(CreateQuestionnaireDto, createQuestionnaireDto),
    );
    expect(errors).toHaveLength(1);
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'symptoms',
        constraints: expect.objectContaining({
          isNotEmpty: 'Please list your symptoms',
        }),
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

    const errors = await validate(
      plainToInstance(CreateQuestionnaireDto, createQuestionnaireDto),
    );
    expect(errors).toHaveLength(1);
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'symptoms',
        constraints: expect.objectContaining({
          isNotEmpty: 'Please list your symptoms',
        }),
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

    const errors = await validate(
      plainToInstance(CreateQuestionnaireDto, createQuestionnaireDto),
    );
    expect(errors).toHaveLength(2);
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'symptoms',
        constraints: expect.objectContaining({
          isNotEmpty: 'Please list your symptoms',
        }),
      }),
    );
    expect(errors).toContainEqual(
      expect.objectContaining({
        property: 'chronicConditionDetails',
        constraints: expect.objectContaining({
          isNotEmpty: 'Please provide details about your chronic illness',
        }),
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

    jest.spyOn(repository, 'find').mockResolvedValue(questionnaires as any);

    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 'uuid1',
        name: 'J**n Doe',
        age: 30,
        gender: Gender.Male,
        healthCondition: HealthCondition.Healthy,
        experiencedSymptoms: YesNo.No,
        dateCreated: questionnaires[0].dateCreated,
        dateUpdated: questionnaires[0].dateUpdated,
      },
      {
        id: 'uuid2',
        name: 'J**e Smith',
        age: 25,
        gender: Gender.Female,
        healthCondition: HealthCondition.MinorIllness,
        experiencedSymptoms: YesNo.Yes,
        symptoms: 'Cough',
        dateCreated: questionnaires[1].dateCreated,
        dateUpdated: questionnaires[1].dateUpdated,
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should not allow symptoms if experiencedSymptoms is no', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.No,
      symptoms: 'Cough and fever',
    };

    await expect(service.create(createQuestionnaireDto)).rejects.toThrow(
      'symptoms should not be provided if experienced symptoms is no',
    );
  });

  it('should not allow chronicConditionDetails if healthCondition is not chronic illness', async () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.No,
      chronicConditionDetails: 'Diagnosed with chronic arthritis',
    };

    await expect(service.create(createQuestionnaireDto)).rejects.toThrow(
      'chronicConditionDetails should not be provided if healthCondition is not chronic illness',
    );
  });
});
