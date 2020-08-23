import React, { useState, useEffect } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles.css';

interface DataPageProps {
    title: string;
    message: string;
    link: string;
}

function Concluded() {
    let [title, setTitle] = useState('');
    let [message, setMessage] = useState('');
    let [link, setLink] = useState('');

    useEffect(() => {
        let fromPage = JSON.parse(localStorage.getItem('from-page-concluded') as string);

        if (fromPage == 1) {
            setTitle('Cadastro concluído');
            setMessage('Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência');
            setLink('/');
        }
        else if (fromPage == 2) {
            setTitle('Redefinição enviada!');
            setMessage('Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.');
            setLink('/');
        }
        else if (fromPage == 3) {
            setTitle('Cadastro salvo!');
            setMessage('Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.');
            setLink('/landing');
        }
        else {
            setTitle('Nenhuma ação realizada');
            setMessage('Você não concluiu nenhuma ação. Volte para ao lógin faça seu cadastro ou vejas as aulas.');
            setLink('/');
        }
    }, []);

    return (
        <div id="page-concluded">
            <div id="box-mensage">
                <span><FiCheckSquare /></span>
                <h1>{title}</h1>
                <p>{message}</p>
                <Link to={link}>
                    <button type="button">Voltar ao login</button>
                </Link>
            </div>
        </div>
    );
}

export default Concluded;