import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireListDto } from './dto/questionnaire-list.dto';
import * as CryptoJS from 'crypto-js';
import { HealthCondition } from '../common/enums/health-condition.enum';
import { YesNo } from '../common/enums/yes-no.enum';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
  ) {}

  async create(
    createQuestionnaireDto: CreateQuestionnaireDto,
  ): Promise<Questionnaire> {
    const dtoInstance = plainToInstance(
      CreateQuestionnaireDto,
      createQuestionnaireDto,
    );
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (
      createQuestionnaireDto.experiencedSymptoms === YesNo.No &&
      createQuestionnaireDto.symptoms
    ) {
      throw new BadRequestException(
        'symptoms should not be provided if experienced symptoms is no',
      );
    }

    if (
      createQuestionnaireDto.healthCondition !==
        HealthCondition.ChronicIllness &&
      createQuestionnaireDto.chronicConditionDetails
    ) {
      throw new BadRequestException(
        'chronicConditionDetails should not be provided if healthCondition is not chronic illness',
      );
    }

    const encryptedName = CryptoJS.AES.encrypt(
      createQuestionnaireDto.name,
      process.env.ENCRYPTION_KEY,
    ).toString();
    const questionnaire = this.questionnaireRepository.create({
      ...createQuestionnaireDto,
      name: encryptedName,
    });
    return this.questionnaireRepository.save(questionnaire);
  }

  async findAll(): Promise<QuestionnaireListDto[]> {
    const questionnaires = await this.questionnaireRepository.find({
      order: {
        dateCreated: 'DESC',
      },
    });
    return questionnaires.map(
      (questionnaire) =>
        new QuestionnaireListDto({
          ...questionnaire,
          name: CryptoJS.AES.decrypt(
            questionnaire.name,
            process.env.ENCRYPTION_KEY,
          ).toString(CryptoJS.enc.Utf8),
        }),
    );
  }
}
