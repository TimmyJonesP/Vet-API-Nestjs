import * as bcryptjs from "bcryptjs";

export const hashPassword = (password) => {
  return bcryptjs.hash(password, 10);
};

export const comparePassword = (password, userPassword) => {
  return bcryptjs.compare(password, userPassword);
};
