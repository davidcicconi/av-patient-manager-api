import express from "express";
import path, { dirname } from "path";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import "dotenv/config";

import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerFile = path.join(__dirname, "build/swagger.json");

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

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Servidor corriendo en http://localhost:${process.env.PORT || 3001}`,
  );
});
