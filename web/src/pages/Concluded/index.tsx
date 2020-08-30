import React, { useState, useEffect } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles.css';
import { getFromPageConcluded } from '../../services/fromConcluded';

interface DataPageProps {
    title: string;
    essege: string;
    link: string;
}

function Concluded() {
    let [title, setTitle] = useState('');
    let [essege, setessege] = useState('');
    let [link, setLink] = useState('');
    let [linkMessege, setLinkMessege] = useState('');

    useEffect(() => {
        let fromPage = getFromPageConcluded();

        if (fromPage === 1) {
            setTitle('Cadastro concluído');
            setessege('Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência');
            setLink('/');
            setLinkMessege('Fazer login');
        }
        else if (fromPage === 2) {
            setTitle('Redefinição enviada!');
            setessege('Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.');
            setLink('/');
            setLinkMessege('Voltar ao login');
        }
        else if (fromPage === 3) {
            setTitle('Cadastro salvo!');
            setessege('Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.');
            setLink('/landing');
            setLinkMessege('Página inicial');
        }
        else {
            setTitle('Nenhuma ação realizada');
            setessege('Você não concluiu nenhuma ação. Volte para ao lógin faça seu cadastro ou vejas as aulas.');
            setLink('/landing');
            setLinkMessege('Página inicial');
        }
    }, []);

    return (
        <div id="page-concluded">
            <div id="box-mensage">
                <span><FiCheckSquare /></span>
                <h1>{title}</h1>
                <p>{essege}</p>
                <Link to={link}>
                    <button type="button">{linkMessege}</button>
                </Link>
            </div>
        </div>
    );
}

export default Concluded;