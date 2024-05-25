import { Global, Module } from "@nestjs/common";

import { PostgresQueryManager } from "@/base/modules/postgres/postgres.qm.service";
import { PostgresTransactionService } from "@/base/modules/postgres/postgres.transaction.service";

@Global()
@Module({
  providers: [PostgresTransactionService, PostgresQueryManager],
  exports: [PostgresTransactionService, PostgresQueryManager],
})
export class GlobalPostgresQueryManagerModule {}
