import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import fs from "fs";
import "dotenv/config";

import "./infrastructure/DI/container";
import { AppDataSource } from "./infrastructure/database/datasource";

const app = express();
const workspaceRoot = process.cwd();
const swaggerCandidates = [
  path.join(workspaceRoot, "src", "build", "swagger.json"),
  path.join(workspaceRoot, "dist", "build", "swagger.json"),
];
const swaggerFile =
  swaggerCandidates.find((candidate) => fs.existsSync(candidate)) ??
  path.join(workspaceRoot, "src", "build", "swagger.json");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (fs.existsSync(swaggerFile)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, "utf8"));
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      swaggerOptions: {
        docExpansion: "list",
        filter: true,
        showRequestDuration: true,
      },
    }),
  );

  console.log(
    `Swagger UI initialized at http://localhost:${process.env.PORT || 3001}/docs`,
  );
} else {
  console.warn(
    "Swagger file not found. API documentation will not be available.",
  );
  console.warn('Run "npm run tsoa" to generate the Swagger file.');
}

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión a la base de datos establecida.");

    app.listen(process.env.PORT || 3001, () => {
      console.log(
        `Servidor corriendo en http://localhost:${process.env.PORT || 3001}`,
      );
    });
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:");
    console.error(error.stack || error);
    process.exit(1);
  });
