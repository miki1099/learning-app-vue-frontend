<template>
    <h1>Dane użytkownika</h1>
    <base-spinner v-if="isLoading"/>
    <div v-if="!isLoading">
        <div class="profile-user-info">
            <div class="profile-info-row">
                <div class="profile-info-name"> Login </div>

                <div class="profile-info-value">
                    <span>{{ userFromStore.login }}</span>
                </div>
            </div>
        </div>
        <div class="profile-user-info">
            <div class="profile-info-row">
                <div class="profile-info-name"> Email </div>

                <div class="profile-info-value">
                    <span> {{ userFromStore.email }} </span>
                </div>
            </div>
        </div>
        <div class="profile-user-info" v-if="userFromStore.name !== null">
            <div class="profile-info-row">
                <div class="profile-info-name"> Imię </div>

                <div class="profile-info-value">
                    <span> {{ userFromStore.name }} </span>
                </div>
            </div>
        </div>
        <div class="profile-user-info" v-if="userFromStore.lastName !== null">
            <div class="profile-info-row">
                <div class="profile-info-name"> Nazwisko </div>

                <div class="profile-info-value">
                    <span> {{ userFromStore.lastName }} </span>
                </div>
            </div>
        </div>
        <div class="profile-user-info" v-if="userFromStore.phone !== null">
            <div class="profile-info-row">
                <div class="profile-info-name"> Telefon </div>

                <div class="profile-info-value">
                    <span> {{ userFromStore.phone }} </span>
                </div>
            </div>
        </div>
        <div class="profile-user-info" v-if="userFromStore.country !== null && userFromStore.street !== null && userFromStore.city !== null">
            <div class="profile-info-row">
                <div class="profile-info-name"> Adres </div>
                <div class="profile-info-value">
                    <span class="address-label">Państwo: </span>
                    <span> {{ userFromStore.country }} </span>
                    <br/>
                    <span class="address-label">Miasto: </span>
                    <span> {{ userFromStore.city }} </span>
                    <br/>
                    <span class="address-label">Ulica: </span>
                    <span> {{ userFromStore.street }} </span>
                    <br/>
                    <span class="address-label">Numer domu: </span>
                    <span> {{ userFromStore.homeNumber }} </span>
                </div>
            </div>
        </div>
        <div class="buttons">
            <router-link class="link" to="/user/me/changeDetails">Zmień dane</router-link>
            <router-link class="link" to="/user/me/changePassword">Zmień hasło</router-link>
            <router-link class="link" to="/user/me/orders">Zamówienia</router-link>
            <router-link class="link" to="/admin" v-if="isAdmin">Strona admina</router-link>
        </div>
    </div>  
    
</template>

<script>
import BaseSpinner from '../../components/atoms/BaseSpinner.vue';

export default {
  components: { BaseSpinner },
    data() {
        return {
            login: null,
            email: null,
            name: null,
            lastName: null,
            country: null,
            city: null,
            street: null,
            homeNumber: null,
            isLoading: false,
        }
    },
    created() {
        this.laodUser();
    },
    computed: {
        userFromStore() {
            return this.$store.getters.getUser;
        }, 
        isAdmin() {
            return this.$store.getters.getIsAdmin;
        }
    },
    methods: {
        laodUser() {
            this.isLoading = true;
            this.$store.dispatch('saveUser');
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>

.buttons {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 30px 0;
}

.link{
    text-decoration: none;
    color: #E9E9E9;
    border: 1px solid #ef3dff;
    background: #ef3dff;
    border-radius: 30px;
    padding: 10px;
    margin: 15px 0px;

}



.profile-user-info {
    display: table;
    width: 98%;
    width: calc(100% - 24px);
    margin: 0 auto
}

.address-label {
    color: #6db2b6;
}

.profile-info-row {
    display: table-row
}

.profile-info-name,
.profile-info-value {
    display: table-cell;
    border-top: 1px dotted #D5E4F1
}

.profile-info-name {
    text-align: right;
    padding: 6px 10px 6px 4px;
    font-weight: 400;
    color: #03e9f4;
    background-color: transparent;
    width: 110px;
    vertical-align: middle
}

@media (max-width: 600px){
    .profile-info-name {
        text-align: left;
    }

    .buttons {
        justify-content: space-between;
    }

    .link{
        padding: 3px;
        flex-basis: 40%;
    }
}
</style>