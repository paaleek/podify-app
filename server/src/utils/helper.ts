// export const = generateToken(length: number): number => {};

import { randomInt } from "crypto";

export const generateToken = (length: number = 6) => {
  let opt = "";

  for (let i = 0; i < length; i++) {
    opt += randomInt(10);
  }
  return opt;
};
