import { Ok, Err, Result } from "ts-results";

export const encase =
  <T, A extends any[]>(fn: (...args: A) => T) =>
  (...args: A): Result<T, any> => {
    try {
      return Ok(fn(...args));
    } catch (e) {
      return Err(e);
    }
  };
