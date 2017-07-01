import express from "express";
import { connectToMongo } from "mongo/connector";

export const server = express();
connectToMongo();
