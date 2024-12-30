import { Express } from "express";
import { prisma } from "../db";
import { validate as uuidValidate } from "uuid";

export const createInstructorsRoutes = (app: Express) => {
  app.get("/instructors", async (req, resp) => {
    const instructors = await prisma.instructor.findMany({
      include: {
        students: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    resp.json({
      success: true,
      instructors,
    });
  });
  app.get("/instructors/:instructorId", async (req, resp) => {
    const { instructorId } = req.params;
    if (!uuidValidate(instructorId)) {
      resp.status(400).json({
        success: false,
        message: "Invalid instructor id",
      });
      return;
    }
    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
    });
    if (!instructor) {
      resp.status(404).json({
        success: false,
        message: "instructor not found",
      });
      return;
    }

    resp.json({
      success: true,
      instructor,
    });
  });

  app.post("/instructors", async (req, resp) => {
    const { name } = req.body;
    if (!name || name.trim().length === 0) {
      resp.status(400).json({
        success: false,
        message: "Name is required",
      });
      return;
    }
    const user = await prisma.instructor.create({
      data: {
        name,
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
