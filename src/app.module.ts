import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import * as path from "path";

import { ClassifiedExceptionFilter } from "@/base/filters/classified.exception.filter";
import { OutInterceptor } from "@/base/interceptors/out.interceptor";
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
    // **                            Databases                            ** //
    // ** =============================================================== ** //
    PostgresConfigModule,
    RedisConfigModule,
    MongoConfigModule,
    Neo4JConfigModule,
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
