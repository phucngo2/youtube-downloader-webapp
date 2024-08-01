// Libs
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "node:http";
import { WebSocketServer } from "ws";

// Routes
import { downloadRouter } from "./routes/download.route";
import { keywordRouter } from "./routes/keyword.route";
import { videoRouter } from "./routes/video.route";

declare global {
  namespace Express {
    interface Request {
      ws?: WebSocket;
    }
  }
}

// Use dotenv to load environment variables from a .env file in the root of the project
dotenv.config({ path: __dirname + "/.env" });

// App
const app = express();

// Cors config
var corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use(express.json());

const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });
wsServer.on("connection", (ws: WebSocket) => {
  app.use((req, _res, next) => {
    req.ws = ws;
    next();
  });

  const routes = [keywordRouter, videoRouter, downloadRouter];

  for (let route of routes) {
    app.use("/api", route);
  }
});

// Port
const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT as string, 10)
  : 5000;

// Run app
server.listen(PORT, () => {});
