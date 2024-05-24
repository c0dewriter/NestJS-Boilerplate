import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostgresConfigService } from "./postgres.config.service";

@Module({
  providers: [PostgresConfigService],
  exports: [PostgresConfigService],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useFactory: (pgConfig: PostgresConfigService) => ({
        type: pgConfig.dbType,
        host: pgConfig.host,
        port: pgConfig.port,
        username: pgConfig.username,
        password: pgConfig.password,
        database: pgConfig.database,
        schema: pgConfig.schema,
        entities: pgConfig.entities,
        synchronize: false,
        logging: process.env.NODE_ENV === "development",
        extra: {
          poolSize: 25,
          connectionTimeoutMillis: 2000,
          query_timeout: 5000,
          statement_timeout: 5000,
        },
        poolSize: 25,

        // * To get database errors as soon as possible.
        retryAttempts: process.env.NODE_ENV === "development" ? 1 : undefined,
      }),
    }),
  ],
})
export class PostgresConfigModule {}
