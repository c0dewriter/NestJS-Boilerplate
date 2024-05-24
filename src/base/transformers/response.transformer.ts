import { type ClassConstructor, plainToInstance } from "class-transformer";

export function transformWithExclude(obj: unknown, type: unknown) {
  return plainToInstance(<ClassConstructor<unknown>>type, obj, {
    excludeExtraneousValues: true,
  });
}
