
function handleErrors(response) {
    if (response.status == 401) {
        throw new Error('Dane logowania są niepoprawne!');
    } else {
        return response;
    }
}

export default {
    state() {
        return {
            token: null,
            login: null,
            tokenExpiration: null,
        };
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.login = payload.login;
            var date = new Date();
            date.setDate(date.getDate() + 6);
            state.tokenExpiration = date;
        },
        setUserWithExt(state, payload) {
            state.token = payload.token;
            state.login = payload.login;
            state.tokenExpiration = payload.tokenExpiration;
        },
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            localStorage.removeItem('tokenExp');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('id');
            state.token = null;
            state.login = null;
            state.tokenExpiration = null;
        }
    },
    actions: {
        async login(context, payload) {

            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch('https://learning-app-stars.herokuapp.com/login', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    login: payload.login,
                    password: payload.password
                })
            })
                .then(handleErrors)
                .catch(error => {
                    console.log(error);
                    if (error.message === null || error.message === 'Failed to fetch') {
                        throw new Error('Logowanie nie powiodło się. Spróbuj ponownie później');
                    } else {
                        throw new Error(error.message);
                    }
                });

            const responseData = await response.json();

            var date = new Date();
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('login', responseData.login);
            localStorage.setItem('tokenExp', date.setDate(date.getDate() + 6));

            context.commit('setUser', {
                token: responseData.token,
                login: responseData.login,
            });
        },
        async signup(context, payload) {
            console.log(payload.address);
            console.log(payload.email);
            console.log(payload.lastName);
            console.log(payload.login);
            console.log(payload.name);
            console.log(payload.password);
            console.log(payload.phone);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch('https://learning-app-stars.herokuapp.com/register', {
                method: 'POST',

                headers: headers,
                body: JSON.stringify({
                    address: payload.address,
                    email: payload.email,
                    id: 0,
                    lastName: payload.lastName,
                    login: payload.login,
                    name: payload.name,
                    password: payload.password,
                    phone: payload.phone
                })
            });

            if (!response.ok) {
                let error = new Error('Rejestrowanie nie powiodło się. Spróbuj później!');
                if (response.status === 409) {
                    error = new Error('Użytkownik o podanym loginie lub emailu już istnieje!');
                }
                throw error;
            }

            localStorage.setItem('loginBuf', payload.login);
        },
        async tryLogIn(context) {
            const token = localStorage.getItem('token');
            const login = localStorage.getItem('login');
            const tokenExp = localStorage.getItem('tokenExp');

            const expiresIn = +tokenExp - new Date().getTime();
            if (expiresIn < 0) {
                context.commit('logout');
                return;
            }

            if (token && login) {
                context.commit('setUserWithExt', {
                    token: token,
                    login: login,
                    tokenExpiration: tokenExp
                });
            }
        },
        async refreshToken(context) {
            let headers = new Headers();
            const token = localStorage.getItem('token');
            
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);
            const response = await fetch(
                'https://learning-app-stars.herokuapp.com/refreshToken',
                {
                  method: 'POST',
                  headers: headers,
                }
              );
              if (!response.ok) {
                return;
              }
            let responseData = await response.json();
            var date = new Date();
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('login', responseData.login);
            localStorage.setItem('tokenExp', date.setDate(date.getDate() + 6));

            context.commit('setUser', {
                token: responseData.token,
                login: responseData.login,
            });
        }
    },
    getters: {
        getLogin: state => {
            return state.login;
        },
        getToken: state => {
            return state.token;
        },
        isAuthenticated: state => {
            return !!state.login;
        },
        getExpirationLeft: state => {
            return state.tokenExpiration  - new Date().getTime();
        }
    }
}