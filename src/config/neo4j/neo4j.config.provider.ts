import { Logger, Provider } from "@nestjs/common";
import * as neo4j from "neo4j-driver";

export const NEO4J_DRIVER_01 = "NEO4J_DRIVER_01";
export const NEO4J_CONFIG_MODULE_CONTEXT = "Neo";

export const neo4jProviders: Array<Provider<neo4j.Driver>> = [
  {
    provide: NEO4J_DRIVER_01,
    useFactory: () => {
      const {
        NEO4J_CONNECTION_SCHEME,
        NEO4J_HOST,
        NEO4J_SERVICE_PORT_EXPOSE,
        NEO4J_SERVICE_PORT_MAP,
        NEO4J_USERNAME,
        NEO4J_PASSWORD,
      } = process.env;

      const PORT = NEO4J_SERVICE_PORT_EXPOSE ?? NEO4J_SERVICE_PORT_MAP.split(":")[0];
      const URI = `${NEO4J_CONNECTION_SCHEME}://${NEO4J_HOST}:${PORT}`;

      try {
        const driver = neo4j.driver(
          URI,
          neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
        );
        return driver;
      } catch (err) {
        Logger.error(
          `Encountered an error while trying to instantiate Neo4J driver: '${err}'`,
          NEO4J_CONFIG_MODULE_CONTEXT,
        );
        throw err;
      }
    },
  },
];
