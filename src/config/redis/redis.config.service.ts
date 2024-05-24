import { Logger, type Provider } from "@nestjs/common";
import { Redis } from "ioredis";

export const REDIS_CLIENT_01 = "REDIS_CLIENT";
export const REDIS_CONFIG_MODULE_CONTEXT = "Redis";

export const redisProvider: Array<Provider<Redis>> = [
  {
    provide: REDIS_CLIENT_01,

    useFactory: () => {
      const {
        REDIS_HOST,
        REDIS_SERVER_PORT_EXPOSE,
        REDIS_SERVER_PORT_MAP,
        REDIS_CACHE_DB_NUMBER,
        REDIS_USERNAME,
        REDIS_PASSWORD,
      } = process.env;

      const redisInstance = new Redis({
        host: REDIS_HOST,
        port: parseInt(REDIS_SERVER_PORT_EXPOSE ?? REDIS_SERVER_PORT_MAP.split(":")[0]),
        db: parseInt(REDIS_CACHE_DB_NUMBER),
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD,
        retryStrategy: (times) => Math.min(times * 50, 2000),
      });

      redisInstance.on("error", (e) => {
        Logger.error(e, REDIS_CONFIG_MODULE_CONTEXT);
        throw new Error("Redis connection failed");
      });

      return redisInstance;
    },

    inject: [],
  },
];
