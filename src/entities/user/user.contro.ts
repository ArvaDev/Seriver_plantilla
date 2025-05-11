import { Request, Response } from "express";
import { hashPassword, comparePassword } from '../../utils/encrypt'
import {
    unauthorizedAlert401, serverErrorAlert500,
    notFoundAlert404, successfulAlert200, conflictAlert409
} from "../../utils/alerts";
import UserModel from "./user.model";
import { generateToken } from "../../utils/tokenized";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body;
        const existingUser = await UserModel.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (existingUser) {
            res.status(409).json(conflictAlert409("Este usuario ya existe"));
            return;
        }

        const newPassword = await hashPassword(password);
        const newUser = new UserModel({ username, password: newPassword, email });
        newUser.token = generateToken(newUser);
        await newUser.save();

        res.status(201).json(successfulAlert200("Usuario creado exitosamente"));
    } catch {
        res.status(500).json(serverErrorAlert500());
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user: any =
            await UserModel.findOne({ username: username }) ||
            await UserModel.findOne({ email: username });
        if (!user) {
            res.status(401).json(unauthorizedAlert401("Revisa tus credenciales"));
            return;
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json(unauthorizedAlert401("Revisa tus credenciales"));
            return;
        }

        const token = generateToken(user);
        user.token = token;
        await user.save();

        res.status(200).json({ message: "Inicio de sesión exitoso", user: user.username, token: token });

    } catch {
        res.status(500).json(serverErrorAlert500());
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const user: any = await UserModel.findOne({ token: token });
        if (!user) {
            res.status(404).json(notFoundAlert404("Usuario no encontrado"));
            return;
        }
        user.token = "";
        await user.save();
        res.status(200).json(successfulAlert200("Cierre de sesión exitoso"));
    } catch {
        res.status(500).json(serverErrorAlert500());
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const user: null | any = await UserModel.findById(id);
        if (!user) {
            res.status(404).json(notFoundAlert404("Usuario no encontrado"));
            return;
        }
        const isPasswordValid = await comparePassword(oldPassword, user.password);
        if (!isPasswordValid) {
            res.status(401).json(unauthorizedAlert401("Revisa tus credenciales"));
            return;
        }
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json(successfulAlert200("Contraseña cambiada exitosamente"));
    } catch {
        res.status(500).json(serverErrorAlert500());
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: null | any = await UserModel.findById(id)
            .select('-password')

        if (!user) {
            res.status(404).json(notFoundAlert404("Usuario no encotrado"));
        }

        res.status(200).json(successfulAlert200('Usuario encontrado', user))
    } catch {
        res.status(500).json(serverErrorAlert500())
    }
}