import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connetion';
import jwt from 'jsonwebtoken';

export default class UsersController {
    async create(request: Request, response: Response) {
        let {
            name,
            email,
            senha,
        } = request.body;

        let [user] = await db('users')
            .where('users.email', '=', email)
            .select('users.*');

        if (user != null && user.email == email) {
            return response.status(209).send();
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        let senhaHash = bcrypt.hashSync(senha, salt);

        try {
            await db("users").insert({
                name,
                email,
                senha: senhaHash
            });

            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new user'
            });
        }
    }

    async login(request: Request, response: Response) {
        let {
            email,
            senha,
        } = request.body;

        try {
            let user = await db('users')
                .where('users.email', '=', email)
                .first();

            let passwordIsValid = bcrypt.compareSync(senha, user.senha);

            if (passwordIsValid) {
                let token = jwt.sign({ user_id: user.id, user_name: user.name }, "proffy-secret-key");

                return response.status(200).send(token);
            }
            else {
                return response.status(401).json({
                    error: 'User authentication failed'
                });
            }
        }
        catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while user logging'
            });
        }
    }
}