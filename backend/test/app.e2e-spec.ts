import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateQuestionnaireDto } from './../src/questionnaire/dto/create-questionnaire.dto';
import { Gender } from './../src/common/enums/gender.enum';
import { HealthCondition } from './../src/common/enums/health-condition.enum';
import { YesNo } from './../src/common/enums/yes-no.enum';

describe('Questionnaire API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should submit the form successfully for healthy status with no symptoms', () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.No,
    };

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBeDefined();
      });
  });

  it('should submit the form successfully for healthy status with symptoms', () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.Yes,
      symptoms: 'Cough and fever',
    };

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBeDefined();
      });
  });

  it('should submit the form successfully for minor illness with no symptoms', () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jane Doe',
      age: 25,
      gender: Gender.Female,
      healthCondition: HealthCondition.MinorIllness,
      experiencedSymptoms: YesNo.No,
    };

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBeDefined();
      });
  });

  it('should submit the form successfully for minor illness with symptoms', () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jane Doe',
      age: 25,
      gender: Gender.Female,
      healthCondition: HealthCondition.MinorIllness,
      experiencedSymptoms: YesNo.Yes,
      symptoms: 'Headache and nausea',
    };

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBeDefined();
      });
  });

  it('should submit the form successfully for chronic illness with symptoms and chronic condition details', () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jim Doe',
      age: 40,
      gender: Gender.Diverse,
      healthCondition: HealthCondition.ChronicIllness,
      experiencedSymptoms: YesNo.Yes,
      symptoms: 'Severe back pain',
      chronicConditionDetails: 'Diagnosed with chronic arthritis',
    };

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBeDefined();
      });
  });

  it('should show validation errors for all required fields not present', () => {
    const createQuestionnaireDto = {};

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(400)
      .expect((res) => {
        const messages = res.body.message;
        expect(messages).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              constraints: expect.objectContaining({
                isNotEmpty: 'Name is required',
              }),
            }),
            expect.objectContaining({
              constraints: expect.objectContaining({
                isPositive: 'Age must be a positive number',
              }),
            }),
            expect.objectContaining({
              constraints: expect.objectContaining({
                isEnum: 'Gender is required',
              }),
            }),
            expect.objectContaining({
              constraints: expect.objectContaining({
                isEnum: 'Health condition is required',
              }),
            }),
            expect.objectContaining({
              constraints: expect.objectContaining({
                isEnum: 'Experienced symptoms is required',
              }),
            }),
          ]),
        );
      });
  });

  it('should validate form for healthy status with symptoms where symptoms is not filled', () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'John Doe',
      age: 30,
      gender: Gender.Male,
      healthCondition: HealthCondition.Healthy,
      experiencedSymptoms: YesNo.Yes,
    };

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(400)
      .expect((res) => {
        const messages = res.body.message;
        expect(messages).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              constraints: expect.objectContaining({
                isNotEmpty: 'Please list your symptoms',
              }),
            }),
          ]),
        );
      });
  });

  it('should validate form for minor illness with symptoms where symptoms is not filled', () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jane Doe',
      age: 25,
      gender: Gender.Female,
      healthCondition: HealthCondition.MinorIllness,
      experiencedSymptoms: YesNo.Yes,
    };

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(400)
      .expect((res) => {
        const messages = res.body.message;
        expect(messages).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              constraints: expect.objectContaining({
                isNotEmpty: 'Please list your symptoms',
              }),
            }),
          ]),
        );
      });
  });

  it('should validate form for chronic illness where symptoms and chronic condition details are not filled', () => {
    const createQuestionnaireDto: CreateQuestionnaireDto = {
      name: 'Jim Doe',
      age: 40,
      gender: Gender.Diverse,
      healthCondition: HealthCondition.ChronicIllness,
      experiencedSymptoms: YesNo.Yes,
    };

    return request(app.getHttpServer())
      .post('/questionnaires')
      .send(createQuestionnaireDto)
      .expect(400)
      .expect((res) => {
        const messages = res.body.message;
        expect(messages).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              constraints: expect.objectContaining({
                isNotEmpty: 'Please list your symptoms',
              }),
            }),
            expect.objectContaining({
              constraints: expect.objectContaining({
                isNotEmpty: 'Please provide details about your chronic illness',
              }),
            }),
          ]),
        );
      });
  });
});
