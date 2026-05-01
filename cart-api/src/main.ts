import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get('APP_PORT') || 4000;

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.listen(port, () => {
    console.log('App is running on %s port', port);
  });
}
bootstrap();
