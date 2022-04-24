import express from "express";
import { KeywordController } from "../controllers/keyword.controller";

export const keywordRouter = express.Router();

const keywordController = new KeywordController();

const path = "/keyword";

keywordRouter.post(path, keywordController.listKeywords);
