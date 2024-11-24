import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Configurar la carpeta de archivos estaticos
  app.useStaticAssets(join(__dirname, '..','public'));
  await app.listen(3000);
  // app.setGlobalPrefix('api', {
  //   exclude: [ // Por cada ruta del frontend, se debe excluir aqui
  //     { path: '/', method: 0 }, //0 ES GET
  //   ]
  // });
  // Habilitar CORS
  // app.enableCors({
  //   origin: 'http://localhost:4200',  // Origen permitido
  // });
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
