// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    NODE_ENV: "development" | "production";

    SERVICE_BIND_PORT: number;
  }
}
