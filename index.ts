import { config } from "dotenv";
import express, { Request, Response } from "express";
import { StatusCodes } from "./src/config/constants/status_codes";
import { initDataSource } from "./src/data/dao/datasource.dao";
import routes from "./src/start/routes";
config();

(async () => {
  const app = express();
  initDataSource();
  routes(app);

  const PORT = process.env.PORT || 3000;

  app.get("/health", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send("I'm Working and Healthy!");
  });

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
})();
