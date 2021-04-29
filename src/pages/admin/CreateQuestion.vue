<template>
    <div class="login-box">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p><pre>{{ error }}</pre></p>
        </base-dialog>
        <h2>Zmiana danych</h2>
        <form @submit.prevent="submitMethod()">
            <p v-if="!isFormValid">{{ invalidFormMessage }}</p>
            <div>
                <div class="user-box">
                    <input type="url" name="" v-model="photoUrl" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Link do zdjęcia</label>
                </div>
                <div class="user-box">
                    <textarea placeholder="Treść pytania" name="" required="" v-model="questionName" :class="{invalid: !isFormValid, valid: isFormValid}"></textarea>
                </div>
                <div class="user-box">
                    <input type="text" name="" required="" v-model="goodAns" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Prawidłowa odpowiedź</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" required="" v-model="badAns1" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Zła odpowiedź</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" v-model="badAns2" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Zła odpowiedź 2 (opcjonalna)</label>
                </div>
                <div class="user-box">
                    <input type="text" name="" v-model="badAns3" :class="{invalid: !isFormValid, valid: isFormValid}">
                    <label>Zła odpowiedź 3 (opcjonalna)</label>
                </div>
                <div class="category-select">
                    <span>Kategoria</span>
                    <select v-model="category" class="select-class">
                        <option disabled value="">----</option>
                        <option>Konstelacje gwiezdne</option>
                        <option>Podstawy astronomii</option>
                        <option>Inne</option>
                    </select>
                    
                </div>
            </div>
            <base-spinner v-if="isLoading"></base-spinner>
            <button id="sign-up" @click.prevent="back">
                COFNIJ
            </button>   
            <button id="sign-up">
                DODAJ PYTANIE
            </button>
            
        </form>  
            
    </div>
</template>

<script>
import BaseDialog from '../../components/UI/BaseDialog.vue';
export default {
  components: { BaseDialog },
  data() {
    return {
      photoUrl: '',
      questionName: '',
      goodAns: '',
      badAns1: '',
      badAns2: '',
      badAns3: '',
      category: '',
      isFormValid: true,
      isLoading: false,
      invalidFormMessage: '',
      error: null,
    };
  },
  methods: {
    async submitMethod() {
      (this.invalidFormMessage = ''), (this.isLoading = true);
      this.isFormValid = true;
      if (this.questionName.length < 10) {
        this.invalidFormMessage += 'Pytanie jest za krótkie!';
        this.isFormValid = false;
        this.isLoading = false;
      }

      if (this.goodAns.length < 2) {
        this.invalidFormMessage += '\nDobra odpowiedź jest za krótka';
        this.isFormValid = false;
        this.isLoading = false;
      }

      if (this.badAns1.length < 2) {
        this.invalidFormMessage += '\nZła odpowiedź jest za krótka';
        this.isFormValid = false;
        this.isLoading = false;
      }

      this.invalidFormMessage = this.invalidFormMessage.trim();
      if (this.isFormValid === false) return;

      let headers = new Headers();
      const token = this.$store.getters.getToken;
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer ' + token);

      let badAns2 = null;
      if (this.badAns2 !== '') {
        badAns2 = this.badAns2;
      }
      let badAns3 = null;
      if (this.badAns3 !== '') {
        badAns3 = this.badAns3;
      }
      let picture = null;
      if (this.photoUrl !== '') {
        picture = this.photoUrl;
      }

      const response = await fetch(
        'https://learning-app-stars.herokuapp.com/admin/question/create',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            badAnswer1: this.badAns1,
            badAnswer2: badAns2,
            badAnswer3: badAns3,
            category: this.category,
            goodAnswer: this.goodAns,
            id: 0,
            picture: picture,
            questionName: this.questionName,
          }),
        }
      );

      if (!response.ok) {
        if (response.status == 401) {
          this.error = 'Zaloguj się aby wykonać akcję';
        } else {
          this.error =
            'Nie udało się stworzyć pytania. Spróbuj ponownie później';
        }
        this.isLoading = false;
        return;
      } else {
        this.isPasswordChanged = true;
      }

      this.isLoading = false;
      this.$router.push('/admin/home');
    },
    handleError() {
      this.error = null;
    },
    back() {
      this.$router.push('/admin/home');
    },
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
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
  color: #e9e9e9;
  text-align: center;
}

.select-class {
  background-color: #303133;
  border-color: #6a6c70;
  color: #e9e9e9;
}

.category-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: 0 150px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 50%;
}
.login-box .user-box textarea {
  width: 50%;
  resize: none;
  font-family: 'Open Sans';
}

.login-box .user-box textarea::placeholder {
  color: #e9e9e9;
  font-family: 'Open Sans';
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
.login-box .user-box label:not(.switch) {
  position: absolute;
  top: 0;
  left: 25%;
  padding: 10px 0;
  font-size: 16px;
  color: #e9e9e9;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 25%;
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

.switch {
  position: relative;
  display: inline-block;
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
  background-color: #e9e9e9;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #3c3c3c;
  -webkit-transition: 0.4s;
  transition: 0.4s;
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
  .login-box .user-box textarea {
    width: 100%;
    resize: none;
    font-family: 'Open Sans';
  }
}
</style>