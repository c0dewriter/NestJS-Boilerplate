import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as path from "path";
import developmentSchema from "@/config/env/schema.development";
import productionSchema from "@/config/env/schema.production";

@Module({
  imports: [
    // ** =============================================================== ** //
    // **                        Env Configuration                        ** //
    // ** =============================================================== ** //
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
      validationSchema:
        process.env.NODE_ENV === "development" ? developmentSchema : productionSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
        dateFormat: "iso",
        debug: process.env.NODE_ENV === "development",
        presence: "required",
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
