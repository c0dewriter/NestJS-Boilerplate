import { ExceptionOriginKey } from "@/base/exceptions/exception.meta";

export const EXCEPTION_CAUSE = {
  COMMON: {
    MISSING_MANDATORY_HEADERS: {
      code: "01000",
      help: [],
      message: "Missing headers",
    },
  },
  ACCESS_CONTROL: {
    PERMISSION_DENIED: {
      code: "00001",
      help: ["Contact support"],
      message: "You do not have permission for requested action",
    },
  },
  CACHE: {
    SAMPLE: {
      code: "00000",
      help: [],
      message: "",
    },
  },
  DATABASE: {},
  TOKEN: {
    ACCOUNT_NO_TOKEN: {
      code: "000911",
      help: [],
      message: "Account has no token associated with it",
    },
    DECODE_ERROR: {
      code: "00912",
      help: [],
      message: "Encountered error while trying to decode token",
    },
    EXPIRED: {
      code: "000913",
      help: ["Try logging in again"],
      message: "Token expired",
    },
    SIGNATURE_MISMATCH: {
      code: "000914",
      help: [],
      message: "Token signature mismatch",
    },
    INVALID_CREDENTIALS: {
      code: "000915",
      help: [],
      message: "Invalid token credentials",
    },
    POSSIBLE_TOKEN_REUSE: {
      code: "000916",
      help: ["Try logging in again"],
      message: "Possible token reuse detected",
    },
    FAMILY_POOL_DEPLETED: {
      code: "000917",
      help: ["Try logging in again"],
      message: "Token family pool depleted",
    },
    UNKNOWN: {
      code: "000999",
      help: [],
      message: "Unexpected error",
    },
  },
  ACCOUNT: {
    LOGIN_EMAIL_NOT_FOUND: {
      code: "00110",
      help: ["Account is inactive", "Account blocked", "Register"],
      message: "No account found with the given email",
    },
    MISSING_LOGIN_HEADERS: {
      code: "00111",
      help: [],
      message: "Missing required login headers",
    },
  },
};

export type ExceptionCause<Origin extends ExceptionOriginKey> =
  keyof (typeof EXCEPTION_CAUSE)[Origin];

export type ExceptionCauseObject<Origin extends ExceptionOriginKey> =
  (typeof EXCEPTION_CAUSE)[Origin][keyof (typeof EXCEPTION_CAUSE)[Origin]];
