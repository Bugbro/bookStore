import bcrypt from "bcrypt";

export const hashValue = async (value) => bcrypt.hash(value, 10);
export const compareHash = async (value, hash) => bcrypt.compare(value, hash);