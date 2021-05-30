<template>
<base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
    <p>{{ error }}</p>
  </base-dialog>
  <base-spinner v-if="isLoading"></base-spinner>
  
    <div class="learn-site" v-if="!isLoading && !isFinished && !isAllLearned">
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
    <div v-if="!isLoading && isAllLearned">
        <div class="flex-column">
        <svg id="moon_x5F_landing" enable-background="new 0 0 300 300" height="150" viewBox="0 0 300 300" width="150" xmlns="http://www.w3.org/2000/svg"><circle cx="124" cy="134" fill="#edebdc" r="90"/><path d="m150 184c-2.211 0-4-1.789-4-4v-108c0-2.211 1.789-4 4-4s4 1.789 4 4v108c0 2.211-1.789 4-4 4z" fill="#543a35"/><circle cx="151" cy="65" fill="#ffce56" r="9"/><path d="m151 78c-7.168 0-13-5.832-13-13s5.832-13 13-13 13 5.832 13 13-5.832 13-13 13zm0-18c-2.758 0-5 2.242-5 5s2.242 5 5 5 5-2.242 5-5-2.242-5-5-5z" fill="#543a35"/><path d="m198 128h-19.537c-6.883 0-12.463-5.58-12.463-12.463v-19.537h32z" fill="#c1dbdc"/><path d="m198 132h-19.539c-9.078 0-16.461-7.383-16.461-16.461v-19.539c0-2.211 1.789-4 4-4h32c2.211 0 4 1.789 4 4v32c0 2.211-1.789 4-4 4zm-28-32v15.539c0 4.664 3.797 8.461 8.461 8.461h15.539v-24z" fill="#543a35"/><path d="m150 84h32v32h-32z" fill="#f53e28"/><path d="m182 120h-32c-2.211 0-4-1.789-4-4v-32c0-2.211 1.789-4 4-4h32c2.211 0 4 1.789 4 4v32c0 2.211-1.789 4-4 4zm-28-8h24v-24h-24z" fill="#543a35"/><path d="m166 104h-12c-2.211 0-4-1.789-4-4s1.789-4 4-4h12c2.211 0 4 1.789 4 4s-1.789 4-4 4z" fill="#543a35"/><path d="m150 172c-58.188 0-107.275 38.841-122.831 92h245.663c-15.557-53.159-64.644-92-122.832-92z" fill="#ffce56"/><path d="m272.832 268h-245.664c-1.258 0-2.445-.594-3.199-1.602-.758-1.008-.992-2.312-.641-3.523 16.352-55.859 68.438-94.875 126.672-94.875s110.32 39.016 126.672 94.875c.352 1.211.117 2.516-.641 3.523-.754 1.008-1.941 1.602-3.199 1.602zm-240.203-8h234.742c-16.961-49.719-64.469-84-117.371-84s-100.41 34.281-117.371 84z" fill="#543a35"/><path d="m156 210c-1.023 0-2.047-.391-2.828-1.172-1.562-1.562-1.562-4.094 0-5.656l14-14c1.562-1.562 4.094-1.562 5.656 0s1.562 4.094 0 5.656l-14 14c-.781.781-1.805 1.172-2.828 1.172z" fill="#543a35"/><path d="m152 234c-1.023 0-2.047-.391-2.828-1.172-1.562-1.562-1.562-4.094 0-5.656l22-22c1.562-1.562 4.094-1.562 5.656 0s1.562 4.094 0 5.656l-22 22c-.781.781-1.805 1.172-2.828 1.172z" fill="#543a35"/><path d="m46.712 224.47 12.467-1.781c2.946-.421 5.872.887 7.522 3.363 2.877 4.316 8.79 5.329 12.94 2.217l.023-.017c4.399-3.299 4.856-9.73.968-13.618-2.907-2.908-4.233-7.04-3.559-11.096l.394-2.371-5.255-2.796c-9.692 7.435-18.279 16.234-25.5 26.099z" fill="#edebdc"/><path d="m74.203 234.074c-.73 0-1.457-.062-2.184-.184-3.516-.605-6.668-2.652-8.645-5.621-.793-1.184-2.23-1.816-3.633-1.621l-12.465 1.781c-1.602.238-3.164-.523-3.996-1.902-.828-1.383-.75-3.125.203-4.422 7.473-10.207 16.32-19.262 26.297-26.91 1.242-.957 2.93-1.086 4.312-.355l5.254 2.793c1.516.805 2.348 2.492 2.066 4.188l-.395 2.371c-.461 2.777.449 5.621 2.441 7.613 2.672 2.672 4.055 6.371 3.785 10.145-.27 3.77-2.16 7.234-5.184 9.5-2.278 1.714-5.051 2.624-7.856 2.624zm-13.957-15.461c3.883 0 7.602 1.941 9.785 5.219.777 1.164 1.961 1.938 3.34 2.172 1.367.242 2.754-.098 3.867-.934 1.211-.91 1.922-2.211 2.027-3.691s-.414-2.871-1.461-3.918c-3.703-3.699-5.457-8.945-4.746-14.113l-.426-.223c-5.988 4.789-11.523 10.133-16.543 15.965l2.523-.363c.544-.075 1.091-.114 1.634-.114z" fill="#543a35"/><path d="m218 258c0-12.15-9.85-22-22-22s-22 9.85-22 22c0 2.083.309 4.09.85 6h42.301c.54-1.91.849-3.917.849-6z" fill="#edebdc"/><path d="m217.148 268h-42.297c-1.789 0-3.359-1.188-3.848-2.906-.667-2.344-1.003-4.731-1.003-7.094 0-14.336 11.664-26 26-26s26 11.664 26 26c0 2.363-.336 4.75-1.004 7.094-.488 1.718-2.058 2.906-3.848 2.906zm-39.031-8h35.766c.078-.668.117-1.336.117-2 0-9.926-8.074-18-18-18s-18 8.074-18 18c0 .664.039 1.332.117 2z" fill="#543a35"/><circle cx="108" cy="202" fill="#edebdc" r="8"/><g fill="#543a35"><path d="m108 214c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-16c-2.207 0-4 1.793-4 4s1.793 4 4 4 4-1.793 4-4-1.793-4-4-4z"/><path d="m112 227.934c-2.211 0-4-1.789-4-4s1.789-4 4-4c7.684 0 13.934-6.25 13.934-13.934 0-2.211 1.789-4 4-4s4 1.789 4 4c0 12.094-9.84 21.934-21.934 21.934z"/><path d="m206.914 77.109c-1.023 0-2.047-.391-2.828-1.172-1.562-1.562-1.562-4.094 0-5.656l14.172-14.176c1.562-1.562 4.094-1.562 5.656 0s1.562 4.094 0 5.656l-14.172 14.176c-.781.782-1.804 1.172-2.828 1.172z"/><path d="m221.086 77.109c-1.023 0-2.047-.391-2.828-1.172l-14.172-14.176c-1.562-1.562-1.562-4.094 0-5.656s4.094-1.562 5.656 0l14.172 14.176c1.562 1.562 1.562 4.094 0 5.656-.781.782-1.805 1.172-2.828 1.172z"/><path d="m54.914 61.109c-1.023 0-2.047-.391-2.828-1.172-1.562-1.562-1.562-4.094 0-5.656l14.172-14.176c1.562-1.562 4.094-1.562 5.656 0s1.562 4.094 0 5.656l-14.172 14.177c-.781.781-1.804 1.171-2.828 1.171z"/><path d="m69.086 61.109c-1.023 0-2.047-.391-2.828-1.172l-14.172-14.175c-1.562-1.562-1.562-4.094 0-5.656s4.094-1.562 5.656 0l14.172 14.176c1.562 1.562 1.562 4.094 0 5.656-.781.781-1.805 1.171-2.828 1.171z"/><circle cx="162" cy="36" r="4"/><circle cx="46" cy="112" r="4"/><circle cx="114" cy="56" r="4"/><circle cx="42" cy="184" r="4"/><circle cx="246" cy="44" r="4"/><circle cx="202" cy="164" r="4"/><circle cx="258" cy="112" r="4"/><circle cx="254" cy="168" r="4"/><path d="m82.914 157.109c-1.023 0-2.047-.391-2.828-1.172-1.562-1.562-1.562-4.094 0-5.656l14.172-14.176c1.562-1.562 4.094-1.562 5.656 0s1.562 4.094 0 5.656l-14.172 14.176c-.781.782-1.804 1.172-2.828 1.172z"/><path d="m97.086 157.109c-1.023 0-2.047-.391-2.828-1.172l-14.172-14.176c-1.562-1.562-1.562-4.094 0-5.656s4.094-1.562 5.656 0l14.172 14.176c1.562 1.562 1.562 4.094 0 5.656-.781.782-1.805 1.172-2.828 1.172z"/><circle cx="122" cy="124" r="4"/></g></svg>
        </div>
        <h2>Gratulacje umiesz już wszystkie pytania z tej kategorii!</h2>
        <base-button @click="$router.push('/home');">Strona główna</base-button>
        <base-button @click="$router.push('/learn');">Wybór innych kategorii</base-button>
        <base-button @click="$router.push('/learn/resetQuestions');">Zresetuj pytania</base-button>
    </div>
    <div class="flex-column" v-if="!isLoading && isFinished">
    <h2></h2>
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
            isAllLearned: false,
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
                category = 'Podstawy astronomii';
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
            if(this.questions.length === 0) this.isAllLearned = true;
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
  /* width: 60%; */
  /* max-width: 900px; */
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

.photo {
    max-height: 500px;
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