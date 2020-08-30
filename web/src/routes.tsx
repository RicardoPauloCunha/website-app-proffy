import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import UserCreate from './pages/UserCreate';
import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import UserPerfil from './pages/UserPerfil';
import TeacherList from './pages/TeacherList';
import Concluded from './pages/Concluded';
import { logged } from './services/auth';

const LandingPrivatePage = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={props =>
            logged() ? <Component {...props} /> : <Redirect to="/" />
        }
    />
)

const TeacherFormPrivatePage = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}

        render={props =>
            logged() ? (<Component {...props} />) : (<Redirect to="/" />)
        }
    />
)

const UserPerfilPrivatePage = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}

        render={props =>
            logged() ? (<Component {...props} />) : (<Redirect to="/" />)
        }
    />
)

const TeacherListPrivatePage = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}

        render={props =>
            logged() ? (<Component {...props} />) : (<Redirect to="/" />)
        }
    />
)

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" component={Login} exact />
            <Route path="/register" component={UserCreate} />
            <LandingPrivatePage path="/landing" component={Landing} />
            <TeacherFormPrivatePage path="/give-classes" component={TeacherForm} />
            <UserPerfilPrivatePage path="/perfil" component={UserPerfil} />
            <TeacherListPrivatePage path="/study" component={TeacherList} />
            <Route path="/concluded" component={Concluded} />
        </BrowserRouter>
    );
}

export default Routes;