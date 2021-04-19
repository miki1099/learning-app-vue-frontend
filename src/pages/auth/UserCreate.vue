<template>
    <div class="login-box">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p><pre>{{ error }}</pre></p>
        </base-dialog>
        <h2>Tworzenie konta</h2>
        <form @submit.prevent="submitMethod()">
            <p v-if="!isFormValid">{{ invalidFormMessage }}</p>
            <div class="user-box">
                <input type="text" name="" required="" v-model="login" :class="{invalid: !isFormValid, valid: isFormValid}">
                <label>Login</label>
            </div>
            <div class="user-box">
                <input type="email" name="" required="" v-model="email" :class="{invalid: !isFormValid, valid: isFormValid}">
                <label>Email</label>
            </div>
            <div class="user-box">
                <input type="password" name="" required="" v-model="password" :class="{invalid: !isFormValid, valid: isFormValid}">
                <label>Hasło</label>
            </div>
            <div class="user-box">
                <input type="password" name="" required="" v-model="passwordAgain" :class="{invalid: !isFormValid, valid: isFormValid}">
                <label>Powtórz hasło</label>
            </div>
            <span>Dodaj więcej informacji</span>
            <div class="user-box">
                <label class="switch">
                    <input type="checkbox" v-model="addinationalInformation">
                    <span class="slider round"></span>
                </label>
            </div>
            <div v-if="addinationalInformation">
                <div class="user-box">
                    <input type="text" name="" required="" v-model="name" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Imię</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" required="" v-model="lastName" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Nazwisko</label>
                </div>
                <div class="user-box">
                    <input type="tel" name="" required="" v-model="phone" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Numer telefonu</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" required="" v-model="address.city" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Miasto</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" required="" v-model="address.street" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Ulica</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" required="" v-model="address.homeNumber" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Numer domu</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" required="" v-model="address.country" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Państwo</label>
                </div>
            </div>
            <base-spinner v-if="isLoading"></base-spinner>
            <button id="sign-up">
                Zarejestruj się
            </button>
        </form>     
    </div>
</template>

<script>

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(input_str) 
{
    var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

    return re.test(input_str);
}

import BaseDialog from '../../components/UI/BaseDialog.vue';
export default {
  components: { BaseDialog },
    data() {
        return {
            login: '',
            password: '',
            passwordAgain: '',
            address: {
                city: '',
                id: 0,
                country: '',
                homeNumber: '',
                street: '',
            },
            email: '',
            lastName: '',
            name: '',
            phone: '',
            addinationalInformation: false,
            isFormValid: true,
            isLoading: false,
            invalidFormMessage: '',
            error: null
        };
    },
    methods: {
        async submitMethod() {
            this.invalidFormMessage = '',
            this.isLoading = true;
            this.isFormValid = true;
            if(this.login === '') {
                this.invalidFormMessage ='Login nie może być pusty!'
                this.isFormValid = false;
                this.isLoading = false;
            } else if(this.login.length < 6) {
                this.invalidFormMessage ='Login jest za krótki minimum 6 znaków!'
                this.isFormValid = false;
                this.isLoading = false;
            }
            if(this.password.length < 8) {
                this.invalidFormMessage +='\nHasło jest za krótkie!'
                this.isFormValid = false;
                this.isLoading = false;
            } else if(this.password !== this.passwordAgain) {
                this.invalidFormMessage +='\nHasła nie są jednakowe!'
                this.isFormValid = false;
                this.isLoading = false;
            }
            if(validateEmail(this.email) === false){
                this.invalidFormMessage +='\nEmail jest nieprawidłowy!'
                this.isFormValid = false;
                this.isLoading = false;
            }

            if(this.addinationalInformation === true && validatePhoneNumber(this.phone) === false) {
                this.invalidFormMessage +='\nNumer telefonu jest nieprawidłowy'
                this.isFormValid = false;
                this.isLoading = false;
            }

            this.invalidFormMessage = this.invalidFormMessage.trim();
            if(this.isFormValid === false) return;

            try {
                if(this.addinationalInformation === true) {
                    await this.$store.dispatch('signup', {
                    login: this.login.trim(),
                    password: this.password,
                    address: this.address,
                    email: this.email.trim(),
                    lastName: this.lastName.trim(),
                    name: this.name.trim(),
                    phone: this.phone.trim()
                });
                } else {
                    await this.$store.dispatch('signup', {
                    login: this.login.trim(),
                    password: this.password,
                    address: null,
                    email: this.email.trim(),
                    lastName: null,
                    name: null,
                    phone: null
                });
                }
                
            } catch(err) {
                this.error = err.message;
                this.isLoading = false;
                return;
            }
            this.isLoading = false;
            this.$router.push('/login');
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
    white-space: pre-wrap;
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
.login-box .user-box label:not(.switch) {
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

.switch {
  position: relative;
  display:inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E9E9E9;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #3C3C3C;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #ef3dff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ef3dff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

@media (max-width: 600px) {
    .login-box .user-box input {
        width: 100%;
    }
    .login-box .user-box label:not(.switch) {
        left: 0;
    }
    .login-box .user-box input:focus ~ label,
    .login-box .user-box input:valid ~ label {
        left: 0;
    }
}
</style>