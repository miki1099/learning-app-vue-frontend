<template>
    <div class="login-box" v-if="!isPasswordChanged">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <h2>Zmiana hasła</h2>
        <h3> {{ userLogin }} </h3>
        <form @submit.prevent="submitMethod()">
            <p v-if="!isFormValid"> <pre>{{ invalidFormMessage }}</pre> </p>
            <div class="user-box">
                <input type="password" name="" required="" v-model="oldPassword" :class="{invalid: !isFormValid, valid: isFormValid}">
                <label>Stare hasło</label>
            </div>
            <div class="user-box">
                <input type="password" name="" required="" v-model="newPassword" :class="{invalid: !isFormValid, valid: isFormValid}">
                <label>Nowe hasło</label>
            </div>
            <div class="user-box">
                <input type="password" name="" required="" v-model="newPasswordAgain" :class="{invalid: !isFormValid, valid: isFormValid}">
                <label>Powtórz nowe hasło</label>
            </div>
            <base-spinner v-if="isLoading"></base-spinner>
            <button id="sign-up" @click.prevent="">
                <router-link to="/user/me">
                    cofnij
                </router-link>
            </button> 
            <button>
                Zmień hasło
            </button>
        </form>   
    </div>
    <div v-if="isPasswordChanged">
        <h2>Hasło zostało pomyślnie zmienione!</h2>
        <router-link to="/home">Strona główna</router-link>
    </div>
</template>

<script>

export default {
    data() {
        return {
            newPassword: '',
            newPasswordAgain: '',
            oldPassword: '',
            invalidFormMessage: '',
            isFormValid: true,
            isLoading: false,
            isPasswordChanged: false,
            error: null,
        }
    },
    computed: {
        userLogin() {
            return this.$store.getters.getLogin;
        }
    },
    methods: {
        async submitMethod() {
            this.isLoading = true;
            this.isFormValid = true;
            this.invalidFormMessage = '';
            if(this.newPassword.length < 6) {
                this.invalidFormMessage += 'Hasło jest za krótkie';
                this.isFormValid = false;
            }
            if(this.newPassword !== this.newPasswordAgain) {
                this.invalidFormMessage += '\nNowe hasła nie są jednakowe';
                this.isFormValid = false;
            }
            
            this.invalidFormMessage = this.invalidFormMessage.trim();
            if(this.isFormValid === false) {
                this.isLoading = false;
                return;
            }

            let headers = new Headers();
            const token = this.$store.getters.getToken;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);

            const response = await fetch('https://learning-app-stars.herokuapp.com/user/me/changePassword', {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({
                    newPassword: this.newPassword,
                    oldPassword: this.oldPassword
                })
            });

            if(!response.ok) {
                if(response.status == 401) {
                    this.error = 'Stare hasło jest niepoprawne';
                } else {
                    this.error = 'Nie udało się zmienić hasła. Spróbuj ponownie później';
                }
                this.isLoading = false;
                return
            } else {
                this.isPasswordChanged = true;
            }

            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>

<style scoped>
p {
    color: rgb(255, 0, 21);
    font-size: 20px;
}

a {
    color: #03e9f4;
    text-decoration: none;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #E9E9E9;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
    width: 30%;
}

.login-box .user-box .invalid {
    color: #E9E9E9;
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #ff002b;
    outline: none;
    background: transparent;
}
.login-box .user-box .valid {
  padding: 10px 0;
  font-size: 16px;
  color: #E9E9E9;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #E9E9E9;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 35%;
  padding: 10px 0;
  font-size: 16px;
  color: #E9E9E9;
  pointer-events: none;
  transition: .5s;
}



.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 35%;
  color: #ef3dff;
  font-size: 15px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ef3dff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 10px;
  letter-spacing: 4px
}

#sign-up {
    color: #03e9f4;
}
button {
    border: none;
    background: none;
}
.login-box button:hover{
    background: #03e9f4;
    box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4;
}

#sign-up:hover {
  background: #ef3dff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ef3dff,
              0 0 25px #ef3dff,
              0 0 50px #ef3dff;
}

@media (max-width: 600px) {
    .login-box .user-box input {
        width: 100%;
    }
    .login-box .user-box label {
        left: 0;
    }
    .login-box .user-box input:focus ~ label,
    .login-box .user-box input:valid ~ label {
        left: 0;
    }
}
</style>