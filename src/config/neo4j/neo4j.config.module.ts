import { Inject, Logger, Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import type { Driver } from "neo4j-driver";

import {
  NEO4J_CONFIG_MODULE_CONTEXT,
  NEO4J_DRIVER_01,
  neo4jProviders,
} from "@/config/neo4j/neo4j.config.provider";

@Module({
  providers: [...neo4jProviders],
  exports: [...neo4jProviders],
})
export class Neo4JConfigModule implements OnModuleDestroy, OnModuleInit {
  constructor(
    @Inject(NEO4J_DRIVER_01)
    private readonly neoDriver: Driver,
  ) {}

  async onModuleInit() {
    await this.neoDriver.executeQuery("RETURN 1");
    Logger.log("Connected to Neo", NEO4J_CONFIG_MODULE_CONTEXT);
  }

  async onModuleDestroy() {
    await this.neoDriver.close();
  }
}
