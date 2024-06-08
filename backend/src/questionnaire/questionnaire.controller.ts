import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireListDto } from './dto/questionnaire-list.dto';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Get()
  async findAll(): Promise<QuestionnaireListDto[]> {
    const questionnaires = await this.questionnaireService.findAll();
    return questionnaires.map((q) => new QuestionnaireListDto(q));
  }
}
