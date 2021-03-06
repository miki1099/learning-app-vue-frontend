<template>
  <base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
    <p>{{ error }}</p>
  </base-dialog>
  <base-spinner v-if="isLoading"></base-spinner>
  <label v-if="!isLoading">Czas testu: {{ formattedElapsedTime }} s</label>
  <base-card mode="question" v-if="!isLoading && !isEnd">
    <img class="photo" :src="questions[questionNumber].picture" />
    <p class="question-text">{{ questions[questionNumber].questionName }}</p>
  </base-card>
  <div class="answers" v-if="!isLoading && !isEnd">
    <base-button
      class="button"
      @click="nextQuestion(0)"
      v-if="answers[0] !== null"
      >{{ answers[0] }}</base-button
    >
    <base-button
      class="button"
      @click="nextQuestion(1)"
      v-if="answers[1] !== null"
      >{{ answers[1] }}</base-button
    >
    <base-button
      class="button"
      @click="nextQuestion(2)"
      v-if="answers[2] !== null"
      >{{ answers[2] }}</base-button
    >
    <base-button
      class="button"
      @click="nextQuestion(3)"
      v-if="answers[3] !== null"
      >{{ answers[3] }}</base-button
    >
  </div>
  <div v-if="!isLoading && isEnd">
    <h2>Twój wynik to: {{ Math.round((score / questions.length) * 100) }}%</h2>
    <base-button @click="tryAgain">Spróbuj ponownie!</base-button>
    <base-button @click="handleErrorOrGoHome">Strona główna</base-button>
    <base-button @click="goToLearn">Ucz się</base-button>
    <h3>Prawidłowe odpowiedzi:</h3>
    <div v-for="question in questions" :key="question.id">
      <base-card mode="question">
        <img class="photo" :src="question.picture" />
        <p class="question-text">{{ question.questionName }}</p>
        <p :class="{'bad-answer': question.choosed != question.goodAnswer}">Wybrana odpowiedź: {{ question.choosed }}</p>
        <p class="good-answer">Prawidłowa odpowiedź: {{ question.goodAnswer }}</p>
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseButton from '../../components/atoms/BaseButton.vue';
import BaseCard from '../../components/UI/BaseCard.vue';
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function saveScore(score, questionAmount, token, mode, testTime) {
  let category = null;
  if (mode === 'constelations') {
    category = 'Konstelacje gwiezdne';
  } else if (mode === 'basicAstronomy') {
    category = 'Konstelacje gwiezdne';
  } else if (mode === 'other') {
    category = 'Inne';
  } else {
    category = 'Wszystko';
  }

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer ' + token);

  const scoreInPercentage = Math.round((score / questionAmount) * 100);
  await fetch(
    'https://learning-app-stars.herokuapp.com/score/create/' +
      scoreInPercentage +
      '?category=' +
      category + 
      '&testTime=' +
      testTime,
    {
      method: 'POST',
      headers: headers,
    }
  )
    .then(handleErrors)
    .catch((error) => {
      if (error.message === null || error.message === 'Failed to fetch') {
        throw new Error(
          'Serwer jest chwilowo nie aktywny spróbuj ponownie póxniej'
        );
      } else {
        throw new Error(error.message);
      }
    });
}

function handleErrors(response) {
  if (response.status == 401) {
    throw new Error('Zaloguj się najpierw!');
  } else {
    return response;
  }
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default {
  components: { BaseButton, BaseCard },
  data() {
    return {
      questionNumber: 0,
      questions: [],
      answers: [],
      isLoading: false,
      isEnd: false,
      score: 0,
      error: null,
      elapsedTime: 0,
      timer: undefined,
    };
  },
  created() {
    try {
      this.getQuestions();
    } catch (ex) {
      this.error = ex.message;
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 10;
      }, 10);
    },
    stop() {
      clearInterval(this.timer);
    },
    async getQuestions() {
      this.isLoading = true;
      let category = null;
      const mode = this.$route.params.mode;
      if (mode === 'constelations') {
        category = 'Konstelacje gwiezdne';
      } else if (mode === 'basicAstronomy') {
        category = 'Podstawy astronomii';
      } else if (mode === 'other') {
        category = 'Inne';
      }

      let headers = new Headers();
      const token = this.$store.getters.getToken;
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer ' + token);

      if (category === null) {
        const response = await fetch(
          'https://learning-app-stars.herokuapp.com/question/getAmount?amount=10',
          {
            method: 'GET',
            headers: headers,
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.replace('/login');
          }
          this.error = 'Nie można załadować pytań spróbuj ponownie później!';
          throw new Error(
            'Nie można załadować pytań spróbuj ponownie później!'
          );
        }
        let questions = await response.json();
        this.questions = shuffle(questions);
        let ans = [
          questions[0].goodAnswer,
          questions[0].badAnswer1,
          questions[0].badAnswer2,
          questions[0].badAnswer3,
        ];
        this.answers = shuffle(ans);
      } else {
        const response = await fetch(
          'https://learning-app-stars.herokuapp.com/question/getCountByCategory/' +
            category +
            '?size=10',
          {
            method: 'GET',
            headers: headers,
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.replace('/login');
          }
          this.error = 'Nie można załadować pytań spróbuj ponownie później!';
          throw new Error(
            'Nie można załadować pytań spróbuj ponownie później!'
          );
        }
        const pagesAvailable = await response.json();
        const pages = getRandomInt(pagesAvailable);
        const responseWithQuestions = await fetch(
          'https://learning-app-stars.herokuapp.com/question/getByCategory/' +
            category +
            '?page=' +
            pages +
            '&size=10',
          {
            method: 'GET',
            headers: headers,
          }
        );
        if (!responseWithQuestions.ok) {
          this.error = 'Nie można załadować pytań spróbuj ponownie później!';
          throw new Error(
            'Nie można załadować pytań spróbuj ponownie później!'
          );
        }
        let questions = await responseWithQuestions.json();
        this.questions = shuffle(questions);
        let ans = [
          questions[0].goodAnswer,
          questions[0].badAnswer1,
          questions[0].badAnswer2,
          questions[0].badAnswer3,
        ];

        this.answers = shuffle(ans);
      }
      this.start();
      this.isLoading = false;
    },
    nextQuestion(questionNumberChoosed) {
      if (
        this.answers[questionNumberChoosed] ===
        this.questions[this.questionNumber].goodAnswer
      ) {
        this.score++;
      }
      this.questions[this.questionNumber].choosed = this.answers[questionNumberChoosed];
      this.questionNumber++;
      if (this.questionNumber >= this.questions.length) {
        this.stop();
        this.isEnd = true;
        this.isLoading = true;
        try {
          saveScore(
            this.score,
            this.questions.length,
            this.$store.getters.getToken,
            this.$route.params.mode,
            this.elapsedTime/1000
          );
        } catch (ex) {
          this.error = ex.message;
        }
        this.isLoading = false;
        return;
      }
      let ans = [
        this.questions[this.questionNumber].goodAnswer,
        this.questions[this.questionNumber].badAnswer1,
        this.questions[this.questionNumber].badAnswer2,
        this.questions[this.questionNumber].badAnswer3,
      ];
      this.answers = shuffle(ans);
    },
    handleErrorOrGoHome() {
      this.$router.push('/home');
    },
    tryAgain() {
      this.$router.go();
    },
    goToLearn() {
      this.$router.push('/learn');
    }
  },
  computed: {
    formattedElapsedTime() {
      let milisecPart;
      if(this.elapsedTime%1000 < 100) {
        milisecPart = '0' + this.elapsedTime%1000;
      } else {
        milisecPart = this.elapsedTime%1000;
      }
      
      return (this.elapsedTime-this.elapsedTime%1000)/1000 + ':' + milisecPart;
    }
  }
};
</script>

<style scoped>
.answers {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.photo {
  width: 100%;
  max-width: 900px;
  height: auto;
  border-radius: 20px;
}

.question-text {
  font-size: 1.5rem;
}

.button {
  box-shadow: 0 0 5px #ef3dff;
  border-radius: 5px;
  font-size: 1.1rem;
}

.good-answer {
  color: #33ff00;
}

.bad-answer {
  color: #FF3131;
}

@media (max-width: 600px) {
  .button {
    font-size: 1.3rem;
  }
}
</style>