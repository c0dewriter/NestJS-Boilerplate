import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { I18nValidationExceptionFilter, I18nValidationPipe } from "nestjs-i18n";

import { AppModule } from "./app.module";
import metadata from "./metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "v",
  });

  app.use(helmet());

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: process.env.NODE_ENV !== "development",
      disableErrorMessages: process.env.NODE_ENV !== "development",
    }),
  );

  app.enableCors();

  if (process.env.NODE_ENV === "development") {
    const openAPIConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle("Boilerplate")
      .setDescription("Super Stable and Production-Ready 😬")
      .setVersion("0.1")
      .build();

    await SwaggerModule.loadPluginMetadata(metadata);

    const swaggerDocument = SwaggerModule.createDocument(app, openAPIConfig, {
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup("/docs/v1/swagger/", app, swaggerDocument);
  }

  await app.listen(3000);
}
bootstrap();
