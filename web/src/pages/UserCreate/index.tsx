import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'

import './styles.css';

import Banner from '../../components/Banner';
import InputTogether from '../../components/InputTogether';
import backItem from '../../assents/images/icons/back.svg'
import api from '../../services/api';
import { setFromPageConcluded } from '../../services/fromConcluded';

function UserCreate() {
    const history = useHistory();

    let [name, setName] = useState('');
    let [surname, setSurname] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [messegeErro, setMessegeErro] = useState('');

    async function create(e: FormEvent) {
        e.preventDefault();

        api.post('users', {
            name,
            surname,
            email,
            password
        })
            .then(() => {
                setFromPageConcluded(1);

                history.push('/concluded');
            })
            .catch(() => {
                setMessegeErro('Ops... ocorreu um erro. Tente outro email ou faça o cadastro mais tarde')
            });
    }

    return (
        <div id="page-register" className="container">

            <main>
                <header>
                    <Link to="/">
                        <img src={backItem} alt="Voltar" />
                    </Link>
                </header>

                <form onSubmit={create}>
                    <fieldset>
                        <legend>Cadastro</legend>
                        <p>Preencha os dados abaixo <br /> para começar.</p>
                        <InputTogether
                            name="name"
                            placeholder="Nome"
                            value={name}
                            firstElement={true}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputTogether
                            name="surname"
                            placeholder="Sobrenome"
                            required
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <InputTogether
                            name="email"
                            placeholder="Email"
                            value={email}
                            type='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputTogether
                            name="password"
                            placeholder="Senha"
                            value={password}
                            lastElement={true}
                            type='password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>

                    {
                        messegeErro && <div>
                            <br />
                            <span className="messege-erro">{messegeErro}</span>
                        </div>
                    }

                    <button type="submit">Concluir Cadastro</button>
                </form>
            </main>

            <Banner />
        </div>
    )
}

export default UserCreate;