import express, { Express } from "express";
import cors from "cors";
import { createRoutes } from "./routes";
import { createErrorHandlers } from "./errors";
import helmet from "helmet";
const port = process.env.PORT || 3000;
const expressApp: Express = express();

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cors());
expressApp.use(helmet());
// expressApp.use(express.static("node_modules/bootstrap/dist"));
expressApp.use(express.json());
createRoutes(expressApp);
createErrorHandlers(expressApp);
expressApp.listen(port, () =>
  console.log(`HTTP Server listening on port ${port}`)
);
