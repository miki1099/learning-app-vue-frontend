<template>

<header>
    <the-burger id="side-menu"></the-burger>
    <div id="user-side">
        <div id="welcome-user" v-if="!!userLogin" @click="goToUserDetails">Witaj {{ userLogin }}!</div>
        <button @click="loginLogout">{{!!!userLogin? 'Zaloguj' : 'Wyloguj'}}</button>
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
            this.$router.push('/home');
        },
        goToUserDetails() {
            this.$router.push('/user/me');
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
}

#user-side {
    display: flex;
    justify-content: flex-end;
}

#welcome-user {
    font-size: calc(15px + 1vw);
    top: 5%;
    text-align: center;
    display: inline-block;
    margin: 0 5%;
    cursor: pointer;
}
 button {
    display: inline-block;
    background: rgba(0, 11, 71, 0.3);
    border-radius: 30px;
    color: #E9E9E9;
    min-width: 70px;
    max-width: 200px;
    width: 10%;
    min-height: 30px;
    /* max-height: 90px; */
    height: 5%;
    font-size: calc(5px + 0.8vw);
 }
</style>