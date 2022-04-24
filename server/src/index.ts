// Libs
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import { keywordRouter } from "./routes/keyword.route";
import { videoRouter } from "./routes/video.route";

// Use dotenv to load environment variables from a .env file in the root of the project
dotenv.config();

// App
const app = express();

// Cors config
app.use(cors());

app.use(express.json());

const routes = [keywordRouter, videoRouter];

for (let route of routes) {
    app.use("/api", route);
}

// Port
const PORT: number = process.env.PORT
    ? parseInt(process.env.PORT as string, 10)
    : 5000;

// Run app
app.listen(PORT, () => {});
