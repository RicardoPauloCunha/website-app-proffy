import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';


import logoImg from '../../assents/images/logo.svg'
import landingImg from '../../assents/images/landing.svg'

import studyIcon from '../../assents/images/icons/study.svg'
import giveClassesIcon from '../../assents/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assents/images/icons/purple-heart.svg'

import api from '../../services/api';

import "./styles.css";

interface UserProps {
    name: string;
    avatar: string;
}

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);
    const [user, setUser] = useState<UserProps>({ avatar: '', name: 'My name' });

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <header>
                    <div className="user-log">
                        <img src={user.avatar} alt="img" />
                        <div>
                            <span>{user.name}</span>
                        </div>
                    </div>

                    <Link className="icon-logout" to="/"><FiLogOut /></Link>
                </header>

                <div className="logo-container">
                    <img src={logoImg} alt="Logo Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Plataforma de estudos"
                    className="hero-image"
                />
            </div>

            <div id="page-landing-footer">
                <div className="action-text">
                    <span>Seja bem-vindo</span>
                    <strong>O que deseja fazer?</strong>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>

                <div className="button-container">
                    <Link to="/study" className="study">
                        <img
                            src={studyIcon}
                            alt="Estudar"
                        />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img
                            src={giveClassesIcon}
                            alt="Dar aulas"
                        />
                        Dar aulas
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;