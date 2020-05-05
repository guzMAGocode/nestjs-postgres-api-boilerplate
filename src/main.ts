import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { Logger } from '@nestjs/common';

async function bootstrap() {

    const logger = new Logger('bootstrap');

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(helmet());
    app.enableCors();

    // Uncomment this block and create "public" and "views" folders on root directory to use views and static assets 
    // app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.setBaseViewsDir(join(__dirname, '..', 'views'));
    // app.setViewEngine('pug');

    const options = new DocumentBuilder()
        .setTitle('NestJS PostgreSQL API')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(process.env.APP_PORT);
    logger.log(`Application running on port ${process.env.APP_PORT}`)
}
bootstrap();
