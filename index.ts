import { config } from "dotenv";
import express, { Request, Response } from "express";
import { StatusCodes } from "./src/config/constants/status_codes";
import { initDataSource } from "./src/data/dao/datasource.dao";
import Postgresql from "./src/data/dbs/postgresql";
import routes from "./src/start/routes";
config();

(async () => {
  const app = express();
  const db = new Postgresql();
  initDataSource(db);
  routes(app);

  const PORT = process.env.PORT || 3000;

  app.get("/health", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send("Working!!");
  });

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
})();
