import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireListDto } from './dto/questionnaire-list.dto';

@ApiTags('questionnaires')
@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new questionnaire entry' })
  @ApiResponse({
    status: 201,
    description: 'The questionnaire has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questionnaire entries' })
  @ApiResponse({ status: 200, description: 'Return all questionnaires.' })
  findAll(): Promise<QuestionnaireListDto[]> {
    return this.questionnaireService.findAll();
  }
}
