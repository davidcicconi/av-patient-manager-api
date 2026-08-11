import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { RegisterRoutes } from "./build/routes";
import { errorHandler } from "./infrastructure/middlewares/errorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrar rutas generadas por TSOA
RegisterRoutes(app);

// Middleware de errores (siempre al final)
app.use(errorHandler);

export default app;
