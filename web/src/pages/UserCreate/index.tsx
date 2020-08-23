import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import './styles.css';

import Banner from '../../components/Banner';
import InputTogether from '../../components/InputTogether';
import backItem from '../../assents/images/icons/back.svg'

function UserCreate() {
    let [name, setName] = useState('');
    let [surname, setSurname] = useState('');
    let [email, setEmail] = useState('');
    let [senha, setSenha] = useState('');

    return (
        <div id="page-register">

            <main>
                <header>
                    <Link to="/">
                        <img src={backItem} alt="Voltar" />
                    </Link>
                </header>

                <form>
                    <fieldset>
                        <legend>Cadastro</legend>
                        <p>Preencha os dados abaixo <br /> para começar.</p>
                        <InputTogether
                            name="name"
                            placeholder="Nome"
                            value={name}
                            firstElement={true}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputTogether
                            name="surname"
                            placeholder="Sobrenome"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <InputTogether
                            name="email"
                            placeholder="Email"
                            value={email}
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputTogether
                            name="senha"
                            placeholder="Senha"
                            value={senha}
                            lastElement={true}
                            type='password'
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </fieldset>

                    <button type="submit">Concluir Cadastro</button>
                </form>
            </main>

            <Banner />
        </div>
    )
}

export default UserCreate;