import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'

const authMiddlewere = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).send({ error: "No token provided" });
    }

    const [scheme, token] = authHeader.split(" ");

    try {
        jwt.verify(token, "proffy-secret-key")
    }
    catch (error) {
        return response.status(401).send({ error: "Token invalid" });
    }

    next();
}

export default authMiddlewere;