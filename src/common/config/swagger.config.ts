import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Nest Auth API')
    .setDescription('API documentation for Nest Auth')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
}
