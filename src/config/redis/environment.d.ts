// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    REDIS_CONNECTION_SCHEME: string;
    REDIS_HOST: string;
    REDIS_CACHE_DB_NUMBER: string;
    REDIS_GENERAL_CACHE_TTL: string;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
    REDIS_SERVER_PORT_MAP: string;
    REDIS_INSIGHT_PORT_MAP: string;
    REDIS_SERVER_PORT_EXPOSE: string;
  }
}
