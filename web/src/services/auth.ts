import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = '@Proffy:token';
export const REMEMBER_KEY = '@Proffy:remember';

export const onSignIn = (tokenValue: string, rememberValue: boolean) => {
    localStorage.setItem(TOKEN_KEY, tokenValue);

    if (rememberValue)
        localStorage.setItem(REMEMBER_KEY, JSON.stringify(rememberValue));
};

export const onSignOut = () => {
    localStorage.removeItem(TOKEN_KEY);

    localStorage.removeItem(REMEMBER_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRemember = () => localStorage.getItem(REMEMBER_KEY);

export const logged = () => {
    let token = getToken();

    return token != null;
}

export const rememberMe = () => {
    let remember = getRemember();

    return remember != null
}

export const decodeToken = () => {
    let token = getToken();

    if (token === null)
        return null;

    let tokenDecoded = jwtDecode(token);

    return (tokenDecoded);
}