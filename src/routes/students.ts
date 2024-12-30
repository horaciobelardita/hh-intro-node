import { Express, RequestHandler } from "express";
import { prisma } from "../db";
import { validate as uuidValidate } from "uuid";

export const createStudentsRoutes = (app: Express) => {
  const checkIsValidUUID: RequestHandler = (req, res, next) => {
    const { studentId } = req.params;
    if (!uuidValidate(studentId)) {
      res.statusCode = 400;
      throw new Error("Invalid student id");
    }
    next();
  };

  app.get("/students", async (req, resp) => {
    const students = await prisma.student.findMany();
    resp.json({
      success: true,
      students,
    });
  });

  app.patch("/students/:studentId", checkIsValidUUID, async (req, resp) => {
    const { studentId } = req.params;
    const { name } = req.body;
    if (!name || name.trim().length === 0) {
      resp.status(400).json({
        success: false,
        message: "Name is required",
      });
      return;
    }
    const student = await prisma.student.update({
      where: { id: studentId },
      data: {
        name,
      },
    });
    resp.json({
      success: true,
      student,
    });
  });

  app.get("/students/:studentId", checkIsValidUUID, async (req, resp) => {
    const { studentId } = req.params;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      resp.status(404).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    resp.json({
      success: true,
      student,
    });
  });

  app.post("/students", async (req, resp) => {
    const { name } = req.body;
    if (!name || name.trim().length === 0) {
      resp.status(400).json({
        success: false,
        message: "Name is required",
      });
      return;
    }
    const user = await prisma.student.create({
      data: {
        name,
        instructorId: "0de64544-2f66-40bc-8649-aa5c618c5b38",
      },
    });
    resp.status(201).json({
      success: true,
      user,
    });
  });

  // app.get("/err", (req, resp) => {
  //     throw new Error ("Something bad happened");
  // });

  // app.get("/asyncerr", async (req, resp) => {
  //     throw new Error ("Something bad happened asynchronously");
  // });
};
