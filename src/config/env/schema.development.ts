import Joi from "joi";

import { SERVICE_PORT_MAP_REGEX } from "@/config/env/regex";

export default Joi.object({
  // ** =========================== General =========================== ** //
  NODE_ENV: Joi.string().valid("development"),
  SERVICE_BIND_PORT: Joi.number().greater(1023),

  // ** =========================== Postgres ========================== ** //
  POSTGRES_CONNECTION_SCHEME: Joi.string().valid("postgres", "postgresql"),
  POSTGRES_HOST: Joi.string().valid("localhost", "127.0.0.1"),
  POSTGRES_SCHEMA: Joi.string().valid("public"),
  POSTGRES_SERVICE_PORT_MAP: Joi.string().pattern(SERVICE_PORT_MAP_REGEX),
  POSTGRES_SERVICE_PORT_EXPOSE: Joi.number().greater(1023),
  POSTGRES_DEFAULT_DATABASE: Joi.string(),
  POSTGRES_SUPERUSER_USERNAME: Joi.string(),
  POSTGRES_SUPERUSER_PASSWORD: Joi.string(),
  POSTGRES_HOST_SERVICE_DIR: Joi.string(),

  // ** ============================ Redis ============================ ** //
  REDIS_HOST: Joi.string().valid("localhost", "127.0.0.1"),
  REDIS_SERVER_PORT_EXPOSE: Joi.number().greater(1023),
  REDIS_SERVER_PORT_MAP: Joi.string().pattern(SERVICE_PORT_MAP_REGEX),
  REDIS_CACHE_DB_NUMBER: Joi.number(),
  REDIS_USERNAME: Joi.string().allow(""),
  REDIS_PASSWORD: Joi.string(),

  // ** ============================ Mongo ============================ ** //
  MONGO_CONNECTION_SCHEME: Joi.string().valid("mongodb", "mongodb+srv"),
  MONGO_HOST: Joi.string().valid("localhost", "127.0.0.1"),
  MONGO_INITDB_ROOT_USERNAME: Joi.string(),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string(),
  MONGO_INITDB_DATABASE: Joi.string(),
  MONGO_SERVICE_PORT_MAP: Joi.string().pattern(SERVICE_PORT_MAP_REGEX),
  MONGO_SERVICE_PORT_EXPOSE: Joi.number().greater(1023),

  // ** ============================= Neo ============================= ** //
  NEO4J_CONNECTION_SCHEME: Joi.string().valid("neo4j", "neo4j+s", "bolt", "bolt+s"),
  NEO4J_HOST: Joi.string().valid("localhost", "127.0.0.1"),
  NEO4J_SERVICE_PORT_MAP: Joi.string().pattern(SERVICE_PORT_MAP_REGEX),
  NEO4J_SERVICE_PORT_EXPOSE: Joi.number().greater(1023),
  NEO4J_USERNAME: Joi.string(),
  NEO4J_PASSWORD: Joi.string(),
});
