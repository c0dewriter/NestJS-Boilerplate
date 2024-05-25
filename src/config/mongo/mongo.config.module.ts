import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { InjectConnection, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import {
  MONGO_CONFIG_MODULE_CONTEXT,
  MongoConfigService,
} from "@/config/mongo/mongo.config.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      inject: [MongoConfigService],
      useFactory: async (config: MongoConfigService) => ({
        uri: config.uriWithoutUserPass,
        dbName: config.database,
        user: config.username,
        pass: config.password,
        appName: config.database,
        autoIndex: process.env.NODE_ENV === "development",
        maxPoolSize: 100, // * This is the default
      }),
    }),
  ],
  providers: [MongoConfigService],
  exports: [MongoConfigService],
})
export class MongoConfigModule implements OnModuleInit {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    await this.connection.db.stats();
    Logger.log("Connected to Mongo", MONGO_CONFIG_MODULE_CONTEXT);
  }
}
