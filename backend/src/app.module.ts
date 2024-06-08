import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { PinoLoggerModule } from './pino-logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        driver: require('mysql2'),
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    QuestionnaireModule,
    PinoLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
