import { Request, Response } from 'express'

import db from '../database/connetion';

export default class PerfisController {
    async verifyUserHasPerfil(request: Request, response: Response) {
        const params = request.params;

        let user_id = parseInt(params.user_id as string);

        if (!user_id) {
            return response.status(400).json({
                error: 'Missing user_id to check user has a perfil'
            });
        }

        try {
            const perfil = await db('perfis')
                .where('perfis.user_id', '=', user_id)
                .first();

            return response.json({hasPerfil: (perfil != null)});
        }
        catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while check user has a perfil'
            });
        }
    }
}