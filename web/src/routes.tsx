import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import UserCreate from './pages/UserCreate';
import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import UserPerfil from './pages/UserPerfil';
import TeacherList from './pages/TeacherList';
import Concluded from './pages/Concluded';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" component={Login} exact />
            <Route path="/register" component={UserCreate} />
            <Route path="/landing" component={Landing} />
            <Route path="/give-classes" component={TeacherForm} />
            <Route path="/perfil" component={UserPerfil} />
            <Route path="/study" component={TeacherList} />
            <Route path="/concluded" component={Concluded} />
        </BrowserRouter>
    );
}

export default Routes;