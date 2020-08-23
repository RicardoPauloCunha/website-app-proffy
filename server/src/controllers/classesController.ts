import { Request, Response } from 'express'

import db from '../database/connetion';
import convertHourToMinutes from '../Utils/convertHourToMinute';

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    async index(request: Request, response: Response) {
        const query = request.query;

        const subject = query.subject as string;
        const week_day = query.week_day as string;
        const time = query.time as string;
        let page = parseInt(query.page as string);
        let limit = parseInt(query.limit as string);

        let filtered = (week_day != undefined && subject != undefined && time != undefined);
        let timeInMinutes = 0;

        if (filtered) {
            if (!week_day || !subject || !time) {
                return response.status(400).json({
                    error: 'Missing filters to search classes'
                })
            }

            timeInMinutes = convertHourToMinutes(time);
        }

        if (!limit && !page) {
            page = 0
            limit = 5;
        }

        try {
            const classes = filtered ? await db('classes')
                .whereExists(function () {
                    this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                })
                .where('classes.subject', '=', subject)
                .offset(page)
                .limit(limit)
                .join('perfis', 'classes.perfil_id', '=', 'perfis.id')
                .join('users', 'perfis.user_id', '=', 'users.id')
                .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                .select(['classes.*', 'perfis.*', 'users.name', 'users.email', 'class_schedule.*'])
                : // Caso não tenha filtro
                await db('classes')
                    .offset(page)
                    .limit(limit)
                    .join('perfis', 'classes.perfil_id', '=', 'perfis.id')
                    .join('users', 'perfis.user_id', '=', 'users.id')
                    .select(['classes.*', 'perfis.*', 'users.name', 'users.email']);

            const classSchedule = await db('class_schedule')
                .where((builder) => {
                    builder.whereIn('class_schedule.class_id', classes.map(x => x.id))
                })
                .select('class_schedule.*');

            const classesReturn = classes.map(x => ({
                ...x,
                class_schedule: classSchedule.filter(y => y.class_id == x.id).map(y => ({ week_day: y.week_day, from: y.from, to: y.to }))
            }));

            return response.json(classesReturn);
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while listing classes'
            });
        }
    }

    async getFavorites(request: Request, response: Response) {
        const query = request.query;

        let user_id = parseInt(query.user_id as string);

        if (!user_id) {
            return response.status(400).json({
                error: 'Missing user_id to search favorite classes'
            });
        }

        let page = parseInt(query.page as string);
        let limit = parseInt(query.limit as string);

        if (!limit && !page) {
            page = 0
            limit = 5;
        }

        try {
            const favorites = await db('favorites')
                .where({ user_id })
                .offset(page)
                .limit(limit)
                .select('class_id');

            const favoritesIds = favorites.map(x => x.class_id);

            const classes = await db('classes')
                .where((builder) => {
                    builder.whereIn('classes.id', favoritesIds)
                })
                .offset(page)
                .limit(limit)
                .join('perfis', 'classes.perfil_id', '=', 'perfis.id')
                .join('users', 'perfis.user_id', '=', 'users.id')
                .select(['classes.*', 'perfis.*', 'users.name', 'users.email']);

            const classSchedule = await db('class_schedule')
                .where((builder) => {
                    builder.whereIn('class_schedule.class_id', classes.map(x => x.id))
                })
                .select('class_schedule.*');

            const classesReturn = classes.map(x => ({
                ...x,
                class_schedule: classSchedule.filter(y => y.class_id == x.id).map(y => ({ week_day: y.week_day, from: y.from, to: y.to }))
            }));

            return response.json(classesReturn);
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while listing favorite classes'
            });
        }
    }

    async create(request: Request, response: Response) {
        const {
            user_id,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body

        const trx = await db.transaction();

        try {
            const insertedPerfisIds = await trx('perfis').insert({
                user_id,
                avatar,
                whatsapp,
                bio
            });

            const perfil_id = insertedPerfisIds[0];

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                perfil_id,
            })

            const class_id = insertedClassesIds[0];

            const classSchecule = schedule.map((scheduleItem: ScheduleItem) => {
                scheduleItem.week_day

                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });

            await trx('class_schedule').insert(classSchecule);

            await trx.commit();

            return response.status(201).send();
        } catch (err) {
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}