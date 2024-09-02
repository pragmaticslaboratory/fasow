import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Swager Configuration**/
  const config = new DocumentBuilder()
    .setTitle('FASOW API Documentation')
    .setDescription(
      'FASOW: A reflexive architecture for agent based models on social networks sites ',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /** Swager Configuration**/

  await app.listen(3000);
}
bootstrap();
