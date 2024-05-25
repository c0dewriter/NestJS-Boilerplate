// ** =============================================================== ** //
// **                              String                             ** //
// ** =============================================================== ** //
export type Email = `${string}@${string}.${string}`;

// ** =============================================================== ** //
// **                             Numeric                             ** //
// ** =============================================================== ** //
type NonNegative = number & { __nonNegative: true };

export type AssertPositive<N extends number> = number extends N
  ? NonNegative
  : `${N}` extends `-${string}`
    ? never
    : N;

export type Hopefully<T> = T | undefined | null;

export type AtLeastOneOf<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
