import { Express, Request } from "express";
import { prisma } from "../db";
import {
  getUserInfoById,
  createUser,
  loginUser,
  findUserByUsername,
} from "../services/users";
export function createUserRoutes(app: Express) {
  app.post(
    "/user/signup",
    async (
      req: Request<{}, {}, { username: string; password: string }>,
      res
    ) => {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          res.status(400).json({
            success: false,
            error: "username and password must be provided",
          });
          return;
        }
        const userExists = await findUserByUsername(username);
        if (userExists) {
          res.status(400).json({
            success: false,
            error: "username already exists",
          });
          return;
        }
        const user = await createUser({ username, password });
        res.status(201).json({ success: true, username: user.username });
      } catch (err) {
        res.status(400).json({
          success: false,
          error: "failed to create the user, does the username already exist?",
        });
      }
    }
  );

  app.post("/user/login", async (req, res) => {
    try {
      const token = await loginUser(req.body);
      res.status(200).send({
        success: true,
        token,
      });
    } catch (err) {
      res.status(400).send({
        success: false,
        error: "login failed, did you enter the correct username/password?",
      });
    }
  });

  app.get("/users/:id", async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id);
    res.status(200).send({
      success: true,
      ...userInfo,
    });
  });
}
