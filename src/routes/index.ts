import { Express } from "express";
import { createUsersRoutes } from "./users";
import { createStudentsRoutes } from "./students";
import { createInstructorsRoutes } from "./instructors";

export const createRoutes = (app: Express) => {
  createOtherRoutes(app);
  createUsersRoutes(app);
  createStudentsRoutes(app);
  createInstructorsRoutes(app);
};
function createOtherRoutes(app: Express) {
  app.get("/", (_req, resp) => {
    resp.json({
      success: true,
      message: "Welcome to the  server",
    });
  });
}
