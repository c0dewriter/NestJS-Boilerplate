import { SetMetadata } from "@nestjs/common";

export const OUT_META_KEY = "OUT_TYPE";
/**
 * * this decorator is used by routes to specify the
 * * controller response data types and ensure that
 * * each controller has an explicitly-defined return object
 */
export const Out = (outClass: unknown) => SetMetadata(OUT_META_KEY, outClass);
