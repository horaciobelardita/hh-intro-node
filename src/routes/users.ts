import { Express } from "express";
import { prisma } from "../db";
// const users = [
//   {
//     id: "0de64544-2f66-40bc-8649-aa5c618c5b38",
//     name: "Max",
//     count: 2,
//   },
//   {
//     id: "79f31fc8-8ca9-4744-a9ac-a68a89d71be2",
//     name: "Abdel",
//     count: 11,
//   },
//   {
//     id: "a5afe6f1-fca6-4752-856a-ca2fa9a54eb6",
//     name: "Adam",
//     count: 6,
//   },
// ];
export const createUsersRoutes = (app: Express) => {
  app.get("/users", async (req, resp) => {
    const users = await prisma.user.findMany();
    resp.json({
      success: true,
      users,
    });
  });

  // app.post("/users", async (req, resp) => {
  //   const { name } = req.body;
  //   if (!name || name.trim().length === 0) {
  //     resp.status(400).json({
  //       success: false,
  //       message: "Name is required",
  //     });
  //     return;
  //   }

  //   resp.status(201).json({
  //     success: true,
  //     user,
  //   });
  // });

  // app.get("/err", (req, resp) => {
  //     throw new Error ("Something bad happened");
  // });

  // app.get("/asyncerr", async (req, resp) => {
  //     throw new Error ("Something bad happened asynchronously");
  // });
};
