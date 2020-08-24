import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { UserProps } from '../Landing';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assents/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api';

interface UserPerfilProps {
    name: string;
    avatar: string;
    subject: string;
}

function UserPerfil() {
    const history = useHistory();
    const [user, setUser] = useState<UserPerfilProps>({ avatar: '', name: 'My name', subject: 'Matemática' });

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: "0", from: "", to: "" }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: "0", from: "", to: "" }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItem);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                page="Meu Perfil"
            >
                <div className="user-infos-header">
                    <img src={user.avatar} alt="avatar" />
                    <strong>{user.name}</strong>
                    <span>{user.subject}</span>
                </div>

            </PageHeader>

            <main>
                <form>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <div className="user-infos">
                            <Input
                                name="name"
                                label="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                name="surname"
                                label="Sobrenome"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>

                        <div className="user-infos">
                            <Input
                                name="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                name="whatsapp"
                                label="Whatsapp"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                            />
                        </div>

                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <div className="group-inputs">
                            <Select
                                name="subject"
                                label="Matéria"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                options={[
                                    { value: "Artes", label: "Artes" },
                                    { value: "Biologia", label: "Biologia" },
                                    { value: "Física", label: "Física" },
                                    { value: "Química", label: "Química" }
                                ]}
                            />

                            <span></span>

                            <Input
                                name="cost"
                                label="Custo da sua hora por aula"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        {
                            scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div key={scheduleItem.week_day} className="schedule-item">
                                        <Select
                                            name="week_day"
                                            label="Dia da semana"
                                            value={scheduleItem.week_day}
                                            onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                            options={[
                                                { value: "0", label: "Domingo" },
                                                { value: "1", label: "Segunda-feira" },
                                                { value: "2", label: "Terça-feira" },
                                                { value: "3", label: "Quarta-feira" },
                                                { value: "4", label: "Quinta-feira" },
                                                { value: "5", label: "Sexta-feira" },
                                                { value: "6", label: "Sábado" }
                                            ]}
                                        />
                                        <Input
                                            name="from"
                                            label="Das"
                                            type="time"
                                            value={scheduleItem.from}
                                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        />

                                        <Input
                                            name="to"
                                            label="Até"
                                            type="time"
                                            value={scheduleItem.to}
                                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default UserPerfil;