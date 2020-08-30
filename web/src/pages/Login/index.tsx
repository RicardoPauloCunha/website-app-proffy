import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'

import './styles.css';

import Banner from '../../components/Banner';
import InputTogether from '../../components/InputTogether';
import purpleHeartIcon from '../../assents/images/icons/purple-heart.svg'
import api from '../../services/api';
import { onSignIn, rememberMe, logged } from '../../services/auth';

function Login() {
    const history = useHistory();

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [remember, setRemember] = useState(false);
    let [buttonDisabled, setButtonDisabled] = useState(true);
    let [messegeErro, setMessegeErro] = useState('');

    useEffect(() => {
        let remember = rememberMe();
        let log = logged();

        if (remember && log)
            history.push('/landing');
    }, []);

    async function login(e: FormEvent) {
        e.preventDefault();

        await api.post('login', {
            email,
            password
        })
            .then(response => {
                onSignIn(response.data, remember);

                history.push('/landing');
            })
            .catch(() => {
                setMessegeErro('Email ou senha inválida.');
            });
    }

    return (
        <div id="page-login" className="container">
            <Banner />

            <main>
                <form onSubmit={login}>
                    <fieldset>
                        <legend>Fazer login</legend>
                        <InputTogether
                            name="email"
                            placeholder="Email"
                            value={email}
                            firstElement={true}
                            type="email"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value)

                                if (password !== '')
                                    setButtonDisabled(false);
                                else
                                    setButtonDisabled(true);
                            }}
                        />
                        <InputTogether
                            name="password"
                            placeholder="Senha"
                            value={password}
                            lastElement={true}
                            type="password"
                            required
                            onChange={(e) => {
                                setPassword(e.target.value)

                                if (email !== '')
                                    setButtonDisabled(false);
                                else
                                    setButtonDisabled(true);
                            }}
                        />
                    </fieldset>

                    <div className='login-options'>
                        <label htmlFor="remember">
                            <input
                                type='checkbox'
                                checked={remember}
                                name='remember'
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            Lembrar-me
                        </label>
                        <Link to="/recovery-password" className="link-recover-password">Esqueci minha senha</Link>
                    </div>

                    {
                        messegeErro && <span className="messege-erro">{messegeErro}</span>
                    }

                    <button type="submit" className={buttonDisabled ? 'button-disabled' : 'button-active'} disabled={buttonDisabled}>Entrar</button>
                </form>

                <footer>
                    <div>
                        <p>Não tem conta?</p>
                        <Link className="link-register-user" to="/register">Cadastre-se</Link>
                    </div>
                    <div>
                        <p>
                            É de graça
                            <img src={purpleHeartIcon} alt="Coração roxo" />
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    )
}

export default Login;