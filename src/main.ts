import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://674c6fada3b78600085ec965--majestic-cocada-7015ba.netlify.app/',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  });

  const port = process.env.PORT ?? 8000;
  console.log(`Aplicação rodando na porta: ${port}`);
  await app.listen(port);
}
bootstrap();
