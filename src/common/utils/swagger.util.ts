import { type INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from 'src/common/config/swagger.config';

export function setupSwagger(app: INestApplication) {
  const config = getSwaggerConfig();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'Nest shortening API',
  });
}
