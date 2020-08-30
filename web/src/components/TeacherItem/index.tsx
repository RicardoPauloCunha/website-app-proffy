import React, { useEffect, useState } from 'react';

import './styles.css'

import whatsappIcon from '../../assents/images/icons/whatsapp.svg'
import api from '../../services/api';

interface ScheduleItemPropos {
    week_day: number;
    from: number;
    to: number;
}

export interface Teacher {
    avatar: string,
    bio: string,
    cost: number,
    id: number,
    name: string,
    surname: string,
    subject: string,
    whatsapp: string,
    class_schedule: ScheduleItemPropos[];
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    let [scheduleItems, setScheculeItems] = useState<ScheduleItemPropos[]>([{ week_day: 0, from: 0, to: 0 }]);

    useEffect(() => {
        const { class_schedule: classWeeks } = teacher;

        if (!classWeeks.some(x => x.week_day === 1))
            classWeeks.splice(0, 0, { week_day: 1, from: -1, to: -1 });

        if (!classWeeks.some(x => x.week_day === 2))
            classWeeks.splice(1, 0, { week_day: 2, from: -1, to: -1 });

        if (!classWeeks.some(x => x.week_day === 3))
            classWeeks.splice(2, 0, { week_day: 3, from: -1, to: -1 });

        if (!classWeeks.some(x => x.week_day === 4))
            classWeeks.splice(3, 0, { week_day: 4, from: -1, to: -1 });

        if (!classWeeks.some(x => x.week_day === 5))
            classWeeks.splice(4, 0, { week_day: 5, from: -1, to: -1 });

        setScheculeItems(classWeeks);
    }, []);

    function weekDayToString(week_day: number) {
        switch (week_day) {
            case 1:
                return 'Segunda';
            case 2:
                return 'Terça';
            case 3:
                return 'Quarta';
            case 4:
                return 'Quinta';
            case 5:
                return 'Sexta';
        }
    }

    async function createNewConnection() {
        await api.post('connections', {
            class_id: teacher.id,
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="avatar" />
                <div>
                    <strong>{`${teacher.name} ${teacher.surname}`}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>

            <div className="class-weeks">
                {
                    scheduleItems.map((scheduleItem: ScheduleItemPropos) => {
                        return <div key={`${scheduleItem.week_day}-${teacher.id}`} className={scheduleItem.to !== -1 ? `schedule-item` : `schedule-item schedule-item-opacity`}>
                            <div className="schedule-item-week-day">
                                <span>Dia</span>
                                <strong>{weekDayToString(scheduleItem.week_day)}</strong>
                            </div>
                            <div>
                                <span>Horário</span>
                                <strong>{scheduleItem.to !== -1 ? `${scheduleItem.from}h - ${scheduleItem.to}h` : '-'} </strong>
                            </div>
                        </div>
                    })
                }
            </div>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a
                    target="blank"
                    onClick={createNewConnection}
                    href={`https://wa.me/${teacher.whatsapp}`}
                    type="button"
                >
                    <img src={whatsappIcon} alt="whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;