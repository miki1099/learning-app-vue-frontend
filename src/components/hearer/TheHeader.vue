<template>

<header>
    <the-burger id="side-menu"></the-burger>
    <div id="user-side">
        <div id="welcome-user" v-if="!!userLogin" @click="goToUserDetails">Witaj {{ userLogin }}!</div>
        <base-button @click="register" v-if="!!!userLogin" class="sign-up">zapisz się</base-button>
        <base-button mode="type2" @click="loginLogout">{{!!!userLogin? 'Zaloguj' : 'Wyloguj'}}</base-button>
    </div>
</header>
</template>

<script>
import TheBurger from '../menu/TheBurger.vue';

export default{
    components: {
        TheBurger
    },
    computed: {
        userLogin() {
            return this.$store.getters.getLogin;
        },
    },
    methods: {
        loginLogout() {
            if(this.$store.getters.getLogin === null){
                this.goToLogin();
            } else {
                this.logout();
            }
        },
        goToLogin() {
            this.$router.push('/login');
        },
        logout() {
            this.$store.commit('logout');
            this.$store.commit('logoutUser');
            this.$router.replace('/home');
        },
        goToUserDetails() {
            this.$router.push('/user/me');
        }, 
        register() {
            this.$router.push('/register');
        }
    }
}
</script>


<style scoped>
header {
    width: 90%;
    margin: 0 5%;
}

#side-menu {
    float: left;
    width: 10%;
    height: 10%;
    margin: 10px 50px 0 0;
}

#user-side {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
}

#welcome-user {
    font-size: calc(15px + 1vw);
    top: 5%;
    text-align: center;
    display: inline-block;
    margin: 0 5%;
    cursor: pointer;
}

.sign-up {
    box-shadow: 0 0 3px #ef3dff;
}

button {
    box-shadow: 0 0 3px #03e9f4;
    border-radius: 5px;
}

@media (max-width: 417px) {
    #side-menu {
        margin: 20px 50px 0 0;
    }
}
</style>