import { Express } from "express";
import { createUsersRoutes } from "./users";

export const createRoutes = (app: Express) => {
  createOtherRoutes(app);
  createUsersRoutes(app);
};
function createOtherRoutes(app: Express) {
  app.get("/", (_req, resp) => {
    resp.json({
      success: true,
      message: "Welcome to the emoji server",
    });
  });
}
