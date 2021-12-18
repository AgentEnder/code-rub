/**
 * @description Tells the typescript compiler that a type is known for an object.
 * Useful anytime you would have to cast an object multiple times in a block of code.
 *
 * ***Does NOT guarantee or check type! This only makes the compiler recognize it as the specified type***
 */
export function assertType<T>(obj: unknown): asserts obj is T {
  return;
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Retype<T, P extends keyof T, T2> = Omit<T, P> & { [key in P]: T2 };
