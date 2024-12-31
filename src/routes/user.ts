import { Express, Request } from "express";
import { prisma } from "../db";
import { getUserInfoById, createUser, loginUser } from "../services/users";
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
            error: "username and password must be provided",
          });
          return;
        }

        const user = await createUser({ username, password });
        res.status(201).json({ username: user.username });
      } catch (err) {
        res.status(400).json({
          error: "failed to create the user, does the username already exist?",
        });
      }
    }
  );

  app.post("/user/login", async (req, res) => {
    try {
      const token = await loginUser(req.body);
      res.status(200).send({ token });
    } catch (err) {
      res.status(400).send({
        error: "login failed, did you enter the correct username/password?",
      });
    }
  });

  app.get("/users/:id", async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id);
    res.status(200).send(userInfo);
  });
}
