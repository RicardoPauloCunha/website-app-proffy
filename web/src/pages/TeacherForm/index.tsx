import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assents/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api';
import { decodeToken } from '../../services/auth';
import { TokenDecodedProps } from '../Landing';
import { setFromPageConcluded } from '../../services/fromConcluded';

export interface UserProps {
    name: string;
    avatar: string;
}

function TeacherForm() {
    const history = useHistory();

    const [userLogged, setUserLogged] = useState<TokenDecodedProps>();

    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: "1", from: "", to: "" }
    ]);

    useEffect(() => {
        let tokenDecoded = decodeToken() as TokenDecodedProps;

        setUserLogged(tokenDecoded);
        
        api.get(`perfis/user-id/${tokenDecoded.user_id}/verify`).then(response => {
            const { hasPerfil: hasPerfilResponse } = response.data;

            if (hasPerfilResponse)
                history.push('/perfil')
        });
    }, []);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: "1", from: "", to: "" }
        ]);
    }

    function removeScheduleItem(index: number) {
        scheduleItems.splice(index, 1);

        setScheduleItems([...scheduleItems]);
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

    function handlerCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            user_id: userLogged?.user_id,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            setFromPageConcluded(3);

            history.push('/concluded');
        }).catch(err => {
            alert("Ocorreu um erro");
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aula."
                description="O primeiro passo é preencher esse formulário de inscrição"
                page="Dar aulas"
            />

            <main>
                <form onSubmit={handlerCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <div className="user-infos">
                            <header>
                                <img src={avatar} alt="avatar" />
                                <div>
                                    <strong>{userLogged?.user_name}</strong>
                                </div>
                            </header>

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
                                    { value: "Ciência", label: "Ciência" },
                                    { value: "E. Física", label: "E. Física" },
                                    { value: "Inglês", label: "Inglês" },
                                    { value: "Matemática", label: "Matemática" },
                                    { value: "Português", label: "Português" },
                                    { value: "Geográfia", label: "Geográfia" },
                                    { value: "História", label: "História" }
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
                                    <div key={index} className="schedule-item">
                                        <div className="form-scheduleItem">
                                            <Select
                                                name="week_day"
                                                label="Dia da semana"
                                                value={scheduleItem.week_day}
                                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                                options={[
                                                    { value: "1", label: "Segunda-feira" },
                                                    { value: "2", label: "Terça-feira" },
                                                    { value: "3", label: "Quarta-feira" },
                                                    { value: "4", label: "Quinta-feira" },
                                                    { value: "5", label: "Sexta-feira" },
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

                                        <div className="delete-time">
                                            <div></div>
                                            <span onClick={() => removeScheduleItem(index)}>Excluir horário</span>
                                            <div></div>
                                        </div>
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

export default TeacherForm;