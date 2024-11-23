import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [ // Por cada ruta del frontend, se debe excluir aqui
      { path: '/', method: 0 }, //0 ES GET
    ]
  });
  // Habilitar CORS
  // app.enableCors({
  //   origin: 'http://localhost:4200',  // Origen permitido
  // });
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
