<template>
    <base-dialog :show="!!error" title="Error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div class="login-box" v-if="!isGood">
        <h2>Nie pamiętasz hasła?</h2>
        <h4>Wpisz swój email poniżej, a dostaniesz emaila zawierającego zresetowane hasło.</h4>
        <form @submit.prevent="submitMethod()">
        <p v-if="!isFormValid">Email jest za krótki!</p>
        <div class="user-box">
            <input
            type="email"
            name=""
            required=""
            v-model="email"
            :class="{ invalid: !isFormValid, valid: isFormValid }"
            />
            <label>Email</label>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <base-button>Zresetuj hasło</base-button>
        </form>
    </div>
    <div v-else>
        <h2>Udało się zmienić hasło!</h2>
        <h3>Na emailu czeka na ciebie nowe zresetowane hasło.</h3>
        <h3>Po zalogowaniu wejdź w zakładkę dane użytkownika zaby zmienić hasło na swoje.</h3>
        <base-button>
            <router-link to="/login">Zaloguj się</router-link>
        </base-button>
    </div>
</template>

<script>
export default {
    data() {
    return {
  
      email: '',
      isFormValid: true,
      isGood: false,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitMethod() {
      this.isLoading = true;
      const response = await fetch('https://learning-app-stars.herokuapp.com/forgotPassword?email=' + this.email, {
                    method: 'PUT',
                });

      if(!response.ok) {
          if(response.status === 404) {
            this.error = 'Użytkownik o podanym emailu nie istnieje!';
          } else {
            this.error = 'Nie udało sie wykonać akcji, spróbuj pownownie później!'
          }
      } else {
        this.isGood = true;
      }
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
p {
  color: rgb(255, 0, 21);
  font-size: 25px;
}

a {
  color: #03e9f4;
  text-decoration: none;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #e9e9e9;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 30%;
}

.login-box .user-box .invalid {
  color: #e9e9e9;
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
  color: #e9e9e9;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 35%;
  padding: 10px 0;
  font-size: 16px;
  color: #e9e9e9;
  pointer-events: none;
  transition: 0.5s;
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
  transition: 0.5s;
  margin-top: 10px;
  letter-spacing: 4px;
}

#sign-up {
  color: #03e9f4;
}
button {
  border: none;
  background: none;
}
.login-box button:hover {
  background: #03e9f4;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4;
}

#sign-up:hover {
  background: #ef3dff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ef3dff, 0 0 25px #ef3dff, 0 0 50px #ef3dff;
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
  p {
    font-size: 20px;
  }
}
</style>