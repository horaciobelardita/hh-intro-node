import { Express } from "express";
import { createUsersRoutes } from "./users";

export const createRoutes = (app: Express) => {
  createUsersRoutes(app);
};
