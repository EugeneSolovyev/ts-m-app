import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import { MONGO_URL } from "../constants/db";
import { headersMiddleware } from "../helpers/headers";
import { AudioController } from "../controllers/audio.controller";
import { Mongoose } from "../DB/db";
import swaggerDoc from "../swagger";

class App {
  public app: any;
  public audioController: AudioController;
  public db: Mongoose;

  constructor() {
    this.app = express();
    this.set_config();

    new Mongoose();
    new AudioController(this.app);
  }

  private set_config() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(
      "/music-service/doc",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDoc)
    );
    this.app.use(headersMiddleware);
  }
}

export default new App().app;
