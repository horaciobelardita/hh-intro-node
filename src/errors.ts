import { Express, ErrorRequestHandler } from "express";
// import "express-async-errors";

export const createErrorHandlers = (app: Express) => {
  app.use((req, resp) => {
    resp.statusCode = 404;
    resp.json({
      success: false,
      error: "no route found",
    });
  });

  const handler: ErrorRequestHandler = (error, req, resp, next) => {
    console.log(error);
    if (resp.headersSent) {
      return next(error);
    }
    try {
      resp.statusCode = 500;
      resp.json({
        success: false,
        error: error.message,
      });
    } catch (newErr) {
      next(error);
    }
  };
  app.use(handler);
};
