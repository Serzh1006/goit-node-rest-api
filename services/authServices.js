import User from "../db/User.js";

export const registerUser = async (payload) => {
  return User.create(payload);
};
