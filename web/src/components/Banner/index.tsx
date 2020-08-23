import React from 'react';

import './styles.css'

import logoImg from '../../assents/images/logo.svg'

const Banner = () => {
    return (
        <div id="banner-content">
            <div>
                <img src={logoImg} alt="Logo Proffy" />
                <h2>Sua plataforma de <br /> estudos online.</h2>
            </div>
        </div>
    )
}

export default Banner;