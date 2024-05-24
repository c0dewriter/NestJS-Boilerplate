import { Module } from "@nestjs/common";

import { PostgresConfigService } from "./postgres.config.service";

@Module({
  providers: [PostgresConfigService],
  exports: [PostgresConfigService],
})
export class PostgresConfigModule {}
