import { Router } from "express";
import userRoutes from "./user/user.router";

const routes = Router();

routes.use("/users", userRoutes);

export default routes;