<template>
    <base-dialog :show="!!error" title="Error" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <h1>Dane użytkownika</h1>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-if="!isLoading && !!!error">
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
            <base-button>
                <router-link class="link" to="/user/me/changeDetails">Zmień dane</router-link>
            </base-button>
            <base-button mode="type2">
                <router-link class="link2" to="/user/me/changePassword">Zmień hasło</router-link>
            </base-button>
            <base-button>
                <router-link class="link" to="/user/me/orders">Zamówienia</router-link>
            </base-button>
            <base-button mode="type2" v-if="isAdmin">
                <router-link class="link2" to="/admin/home" >Strona admina</router-link>
            </base-button>
        </div>
    </div>  
    
</template>

<script>
import BaseButton from '../../components/atoms/BaseButton.vue';
import BaseSpinner from '../../components/atoms/BaseSpinner.vue';

export default {
  components: { BaseSpinner, BaseButton },
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
            error: null,
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
        async laodUser() {
            this.isLoading = true;
            if(this.$store.getters.getLogin === null) {
                this.error = 'Nie jesteś zalogowany!'
                this.isLoading = false;
                return;
            }
            try{
                await this.$store.dispatch('saveUser');
            } catch(ex) {
                this.error = ex.message;
            }
            this.isLoading = false;
        },
        handleError() {
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>

p {
  color: #E9E9E9;
}
.buttons {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 30px 0;
}

.link{
    text-decoration: none;
    color: #ef3dff;
}

.link2{
    text-decoration: none;
    color: #03e9f4;
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

    /* .link{
        padding: 3px;
        flex-basis: 40%;
    } */
}
</style>