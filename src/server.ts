import { createServer } from "http";
import express, { Express } from "express";
import { createRoutes } from "./routes";
import { createErrorHandlers } from "./errors";
const port = 3000;
const expressApp: Express = express();

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

// expressApp.use(express.static("node_modules/bootstrap/dist"));
expressApp.use(express.json());
createRoutes(expressApp);
createErrorHandlers(expressApp);
expressApp.listen(port, () =>
  console.log(`HTTP Server listening on port ${port}`)
);
