import { Router } from "express";
import { createUser, loginUser, 
         logoutUser, changePassword,
         getUser } from "./user.contro";

const userRoutes = Router();

userRoutes.get('/:id', getUser)
userRoutes.post("/create", createUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.put("/change-password/:id", changePassword);

export default userRoutes;
