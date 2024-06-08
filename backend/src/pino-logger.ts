import { LoggerModule, Params } from 'nestjs-pino';
import { Module } from '@nestjs/common';

function maskSensitiveData(data: any) {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const maskFields = ['name', 'symptoms', 'chronicConditionDetails'];
  for (const field of maskFields) {
    if (data[field]) {
      data[field] = '*'.repeat(data[field].length);
    }
  }
  return data;
}

const pinoHttp: Params['pinoHttp'] = {
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
      messageFormat:
        '{method} {url} {statusCode} {responseTime}ms - req: {req.body}',
    },
  },
  serializers: {
    req: (req) => {
      req.body = maskSensitiveData(req.body);
      return JSON.stringify(req);
    },
    res: (res) => res,
  },
};

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: process.env.NODE_ENV !== 'production' ? pinoHttp : {},
    }),
  ],
})
export class PinoLoggerModule {}
