import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assents/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api';
import { TokenDecodedProps } from '../Landing';
import { decodeToken } from '../../services/auth';
import { setFromPageConcluded } from '../../services/fromConcluded';

function UserPerfil() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { id: 0, week_day: "1", from: "", to: "" }
    ]);

    useEffect(() => {
        let tokenDecoded = decodeToken() as TokenDecodedProps;

        api.get(`classes/user-id/${tokenDecoded.user_id}`)
            .then((response: any) => {
                setName(response.data.name);
                setSurname(response.data.surname);
                setAvatar(response.data.avatar);
                setEmail(response.data.email);
                setWhatsapp(response.data.whatsapp);
                setBio(response.data.bio);
                setSubject(response.data.subject);
                setCost(response.data.cost);
                setScheduleItems(response.data.class_schedule);
            });
    }, []);

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItem);
    }

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { id: 0, week_day: "1", from: "", to: "" }
        ]);
    }

    function removeScheduleItem(index: number) {
        scheduleItems.splice(index, 1);

        setScheduleItems([...scheduleItems]);
    }

    function editClassPerfil(e: FormEvent) {
        e.preventDefault();

        let tokenDecoded = decodeToken() as TokenDecodedProps;

        api.put(`/classes/user-id/${tokenDecoded.user_id}`, {
            name,
            surname,
            email,
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
                page="Meu Perfil"
            >
                <div className="user-infos-header">
                    <img src={avatar} alt="avatar" />
                    <strong>{`${name} ${surname}`}</strong>
                    <span>{subject}</span>
                </div>

            </PageHeader>

            <main>
                <form onSubmit={editClassPerfil}>
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

export default UserPerfil;