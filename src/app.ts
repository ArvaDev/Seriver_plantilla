import { startServer } from "./services/express/express";
import { connectDB } from "./db/mongo";

startServer();
connectDB();