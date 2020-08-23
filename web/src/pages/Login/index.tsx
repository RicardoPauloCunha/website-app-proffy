import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import './styles.css';

import Banner from '../../components/Banner';
import InputTogether from '../../components/InputTogether';
import purpleHeartIcon from '../../assents/images/icons/purple-heart.svg'

function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [remember, setRemember] = useState('');
    let [buttonDisabled, setButtonDisabled] = useState(true);

    return (
        <div id="page-login">
            <Banner />

            <main>
                <form>
                    <fieldset>
                        <legend>Fazer login</legend>
                        <InputTogether
                            name="email"
                            placeholder="Email"
                            value={email}
                            firstElement={true}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputTogether
                            name="password"
                            placeholder="Senha"
                            value={password}
                            lastElement={true}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>

                    <div className='login-options'>
                        <label htmlFor="remember">
                            <input
                                type='checkbox'
                                value={remember}
                                name='remember'
                                onChange={(e) => setRemember(e.target.value)}
                            />
                            Lembrar-me
                        </label>
                        <Link to="/recuperar-senha" className="link-recover-password">Esqueci minha senha</Link>
                    </div>

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