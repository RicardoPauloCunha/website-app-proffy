import { Request, Response } from 'express'
import db from '../database/connetion';

export default class ConnectionsController {
    async create(request: Request, response: Response) {
        const { class_id, user_id } = request.body;

        try {
            await db('favorites').insert({
                class_id,
                user_id
            });

            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new user'
            });
        }
    }

    async delete(request: Request, response: Response) {
        const { class_id, user_id } = request.body;

        try {
            await db('favorites')
            .where('user_id', '=', user_id)
            .where('class_id', '=', class_id)
            .delete();

            return response.status(200).send();
        }
        catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while deleting connection'
            });
        }
    }
}