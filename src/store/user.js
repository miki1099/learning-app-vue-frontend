
export default {
    state() {
        return {
            login: null,
            email: null,
            name: null,
            lastName: null,
            country: null,
            city: null,
            street: null,
            homeNumber: null,
            phone: null,
            isAdminRole: false,
        };
    },
    actions: {
        async saveUser(context) {

            let headers = new Headers();
            const token = context.rootState.auth.token;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);
            const response = await fetch('https://learning-app-stars.herokuapp.com/user/me', {
                method: 'GET',
                headers: headers,
            });

            const responseData = await response.json();
            if(!response.ok) {
                return
            }
            
            console.log(responseData);

            const roles = responseData.roles;

            for(var i = 0; i < roles.length; i++) {
                if (roles[i].name == 'ADMIN') {
                    context.commit('setAdmin');
                    break;
                }
            }

            if(responseData.address !== null) {
                context.commit('saveUser', {
                    email: responseData.email,
                    login: responseData.login,
                    name: responseData.name,
                    lastName: responseData.lastName,
                    city: responseData.address.city,
                    country: responseData.address.country,
                    street: responseData.address.street,
                    phone: responseData.phone,
                    homeNumber: responseData.address.homeNumber,
                });
            } else {
                context.commit('saveUser', {
                    email: responseData.email,
                    login: responseData.login,
                    name: responseData.name,
                    lastName: responseData.lastName,
                    phone: responseData.phone,
                    city: null,
                    country: null,
                    street: null,
                    homeNumber: null,
                });
            }
        },
        async updateUser(context, payload) {
            let headers = new Headers();
            const token = context.rootState.auth.token;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);
            const response = await fetch('https://learning-app-stars.herokuapp.com/user/me', {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({
                    address: payload.address,
                    email: payload.email,
                    id: 0,
                    lastName: payload.lastName,
                    login: null,
                    name: payload.name,
                    password: null,
                    phone: payload.phone
                })
            });

            const responseData = await response.json();
            if(!response.ok) {
                return
            }
            
            console.log(responseData);

            const roles = responseData.roles;

            for(var i = 0; i < roles.length; i++) {
                if (roles[i].name == 'ADMIN') {
                    context.commit('setAdmin');
                    break;
                }
            }

            if(responseData.address !== null) {
                context.commit('saveUser', {
                    email: responseData.email,
                    login: responseData.login,
                    name: responseData.name,
                    lastName: responseData.lastName,
                    city: responseData.address.city,
                    country: responseData.address.country,
                    street: responseData.address.street,
                    homeNumber: responseData.address.homeNumber,
                });
            } else {
                context.commit('saveUser', {
                    email: responseData.email,
                    login: responseData.login,
                    name: responseData.name,
                    lastName: responseData.lastName,
                    city: null,
                    country: null,
                    street: null,
                    homeNumber: null,
                });
            }
        }
    },
    mutations: {
        saveUser(state, data){
            state.login = data.login;
            state.email = data.email;
            state.name = data.name;
            state.lastName = data.lastName;
            state.country = data.country;
            state.city = data.city;
            state.street = data.street;
            state.phone = data.phone;
            state.homeNumber = data.homeNumber;
        },
        setAdmin(state) {
            state.isAdminRole = true;
        },
        logoutUser(state) {
            state.login = null;
            state.email = null;
            state.name = null;
            state.lastName = null;
            state.country = null;
            state.city = null;
            state.street = null;
            state.phone = null;
            state.homeNumber = null;
            state.isAdminRole = false;
        }
    },
    getters: {
        getUser: state => {
            const userReturn = {
                login: state.login,
                email: state.email,
                name: state.name,
                lastName: state.lastName,
                country: state.country,
                city: state.city,
                street: state.street,
                phone: state.phone,
                homeNumber: state.homeNumber
            };

            return userReturn;
        },
        getIsAdmin: state => {
            return state.isAdminRole;
        }
    }
}