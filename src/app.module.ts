import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from "nestjs-i18n";
import * as path from "path";

import { ClassifiedExceptionFilter } from "@/base/filters/classified.exception.filter";
import { OutInterceptor } from "@/base/interceptors/out.interceptor";
import { GlobalPostgresQueryManagerModule } from "@/base/modules/postgres/postgres.qm.module";
import developmentSchema from "@/config/env/schema.development";
import productionSchema from "@/config/env/schema.production";
import { MongoConfigModule } from "@/config/mongo/mongo.config.module";
import { Neo4JConfigModule } from "@/config/neo4j/neo4j.config.module";
import { PostgresConfigModule } from "@/config/postgres/postgres.config.module";
import { RedisConfigModule } from "@/config/redis/redis.config.module";

@Module({
  imports: [
    // ** =============================================================== ** //
    // **                        Env Configuration                        ** //
    // ** =============================================================== ** //
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
      validationSchema:
        process.env.NODE_ENV === "development" ? developmentSchema : productionSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
        dateFormat: "iso",
        debug: process.env.NODE_ENV === "development",
        presence: "required",
      },
    }),

    // ** =============================================================== ** //
    // **                     Database Configurations                     ** //
    // ** =============================================================== ** //
    PostgresConfigModule,
    RedisConfigModule,
    MongoConfigModule,
    Neo4JConfigModule,

    // ** =============================================================== ** //
    // **                        Database Services                        ** //
    // ** =============================================================== ** //
    GlobalPostgresQueryManagerModule,

    // ** =============================================================== ** //
    // **                               I18n                              ** //
    // ** =============================================================== ** //
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: process.env.NODE_ENV === "development",
      },
      resolvers: [
        new HeaderResolver(["x-app-lang"]),
        new QueryResolver(["lang"]),
        AcceptLanguageResolver,
      ],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: OutInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ClassifiedExceptionFilter,
    },
  ],
})
export class AppModule {}
