import jwt from "jsonwebtoken";

interface Tokenized {
    id: string;
    username: string;
    email: string;
}

const SECRET_KEY = 'pasoalto'

export const generateToken = (user: any): string => {
    const { _id, username, email } = user;
    const id = _id.toString()
    const token = jwt.sign({ id, username, email }, SECRET_KEY);
    return token;
}

export const verifyToken = (token: string): Tokenized | null => {
    return jwt.verify(token, SECRET_KEY) as Tokenized;
}