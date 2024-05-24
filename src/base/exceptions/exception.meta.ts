export const EXCEPTION_ORIGIN = {
  DATABASE: "Z",
  CACHE: "X",
  TOKEN: "Y",
  ACCESS_CONTROL: "W",
  ACCOUNT: "U",
  COMMON: "G",
};

export const EXCEPTION_DOMAIN = {
  UNBOUND: {
    CODE: "Y",
  },
};

export type ExceptionOriginKey = keyof typeof EXCEPTION_ORIGIN;
export type ExceptionDomainKey = keyof typeof EXCEPTION_DOMAIN;
