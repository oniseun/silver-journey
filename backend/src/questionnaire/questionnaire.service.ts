import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { Questionnaire } from './entities/questionnaire.entity';
import { QuestionnaireListDto } from './dto/questionnaire-list.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
  ) {}

  async create(
    createQuestionnaireDto: CreateQuestionnaireDto,
  ): Promise<Questionnaire> {
    const questionnaire = this.questionnaireRepository.create(
      createQuestionnaireDto,
    );
    return this.questionnaireRepository.save(questionnaire);
  }

  async findAll(): Promise<QuestionnaireListDto[]> {
    const questionnaires = await this.questionnaireRepository.find();
    return questionnaires.map((q) => {
      q.name = q.decryptName();
      return new QuestionnaireListDto(q);
    });
  }
}
