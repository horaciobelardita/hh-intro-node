import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db";

export async function findUserByUsername(username: string) {
  return await prisma.user.findUnique({ where: { username } });
}

export async function createUser({ username, password }: Omit<User, "id">) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
}

export async function loginUser({ username, password }: Omit<User, "id">) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error("invalid username!");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("invalid password!");
  }
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  return token;
}

export async function getUserInfoById(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { username: userId };
    return { username: user.username };
  } catch (err) {
    return { username: userId };
  }
}
