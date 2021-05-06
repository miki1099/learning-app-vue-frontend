<template>
<base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
    <p>{{ error }}</p>
  </base-dialog>
  <base-spinner v-if="isLoading"></base-spinner>
  
    <div class="learn-site" v-if="!isLoading && !isFinished">
        <div class="flex-row" v-if="isCardFlip">
            <base-button mode="type2" @click="answer(true)">Rozumiem</base-button>
            <base-button mode="type2" @click="answer(false)">Ucz się jeszcze raz</base-button>
        </div>
        <div class="flip-card" @click="flipCard">
            <div class="flip-card-inner" :class="{'flip-card-click': isCardFlip }" >
                <div class="flip-card-front">
                    <img class="photo" :src="questions[currentQuestion].picture" />
                    <p>{{ questions[currentQuestion].questionName }}</p>
                </div>
                <div class="flip-card-back">
                    <p :class="{'opacity': !isCardFlip }">{{ questions[currentQuestion].goodAnswer }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex-column" v-if="!isLoading && isFinished">
    <h2>Ukończono</h2>
    <base-button @click="$router.go();">Ucz się dalej</base-button>
    <base-button @click="$router.push('/home');">Strona główna</base-button>
    <base-button @click="$router.push('/learn');">Wybór innych kategorii</base-button>
  </div>
</template>

<script>
import BaseButton from '../../components/atoms/BaseButton.vue';
export default {
  components: { BaseButton },
    data() {
        return {
            currentQuestion: 0,
            questionsLearned: [],
            questions: [],
            isFinished: false,
            isLoading: false,
            isCardFlip: false,
            error: null,
        }
    },
    created() {
        try {
            this.getQuestions();
        } catch (ex) {
            this.error = ex.message;
        }
    },
    methods: {
        handleErrorOrGoHome() {
            this.$router.push('/home');
        },
        flipCard() {
            this.isCardFlip = !this.isCardFlip;
        },
        async getQuestions() {
            this.isLoading = true;
            let category = null;
            const mode = this.$route.params.mode;
            if (mode === 'constelations') {
                category = 'Konstelacje gwiezdne';
            } else if (mode === 'basicAstronomy') {
                category = 'Konstelacje gwiezdne';
            } else if (mode === 'other') {
                category = 'Inne';
            }
            let headers = new Headers();
            const token = this.$store.getters.getToken;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);
            let response;
            if(category === null) {
                response = await fetch('https://learning-app-stars.herokuapp.com/questions/getNotLearned?amount=10', {
                    method: 'GET',
                    headers: headers,
                });
            } else {
                response = await fetch('https://learning-app-stars.herokuapp.com/questions/getNotLearned?amount=10&category=' + category, {
                    method: 'GET',
                    headers: headers,
                });
            }
            if(!response.ok) {
                if (response.status === 401) {
                    this.$router.replace('/login');
                }
                throw new Error("Nie można załadować pytań, spróbuj ponownie później!");
            }
            this.questions = await response.json();
            this.isLoading = false;
        },
        answer(isCorrectAnswered) {
            if(isCorrectAnswered) {
                this.questionsLearned.push(this.questions[this.currentQuestion].id);
            }
            this.isCardFlip = false;
            this.currentQuestion++;
            if(this.currentQuestion >= this.questions.length) {
                this.endLearn();
            }
        },
        async endLearn() {
            this.isLoading = true;
            this.isFinished = true;

            let headers = new Headers();
            const token = this.$store.getters.getToken;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);
            if(this.questionsLearned.length !== 0) {
                const response = await fetch('https://learning-app-stars.herokuapp.com/user/updateQuestionsLearned/me', {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(this.questionsLearned),
                });
            
                if(!response.ok) {
                    throw new Error("Niestety nie udało się zapisać pytań :(");
                }
            }
            
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.flex-column {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.flex-row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.photo {
  width: 60%;
  max-width: 900px;
  border-radius: 20px;
}
.learn-site {
      text-align: center;
}

.flip-card {
  background-color: transparent;
  height: 700px;
  perspective: 3000px;
  font-size: 1.5rem;
  border-radius: 20px;
}

.opacity {
    opacity: 0;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 20px;
}

.flip-card-click {
    transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
    position: relative;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 20px;
}

.flip-card-front {
    position: absolute;
  background-color: rgb(187, 162, 162);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  cursor: pointer;
}

.flip-card-back {
  background-color: #a555b9;
  color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  overflow: auto;
  cursor: pointer;
}

.flip-card-back p, .flip-card-front p {
    width: 80%;

}

@media (max-width: 600px) {
    .photo {
        width: 95%;
    }

    .flip-card {
        height: 500px;
    }
}
</style>