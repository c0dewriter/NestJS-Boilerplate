import { Inject, Logger, Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

import {
  REDIS_CLIENT_01,
  REDIS_CONFIG_MODULE_CONTEXT,
  redisProvider,
} from "./redis.config.service";
import { Redis } from "ioredis";

@Module({
  providers: [...redisProvider],
  exports: [...redisProvider],
})
export class RedisConfigModule implements OnModuleInit {
  constructor(
    @Inject(REDIS_CLIENT_01)
    private readonly redisClient: Redis,
  ) {}

  async onModuleInit() {
    await this.redisClient.ping();
    Logger.log("Connected to Redis", REDIS_CONFIG_MODULE_CONTEXT);
  }
}
