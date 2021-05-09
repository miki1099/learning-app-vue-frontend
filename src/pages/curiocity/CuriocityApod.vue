<template>
    <base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>

    <div class="main" v-if="!isLoading">
        <h2>{{ title }}</h2>
        <img class="photo" :src="imgUrl" />
        <p>{{ explanation }}</p>
        <a target="_blank" :href="fullResUrl">Link do zdjęcia w pełnym wymiarze</a>
        <p>Autor: {{ author }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: null,
            author: null,
            explanation: null,
            fullResUrl: null,
            title: null,
            isLoading: false,
            error: null
        }
    },
    created() {
        try {
            this.getApod();
        } catch (ex) {
            this.error = ex.message;
        }
    },
    methods: {
        handleErrorOrGoHome() {
            this.$router.push('/home');
        },
        async getApod() {
            this.isLoading = true;

            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
                    method: 'GET',
                }).catch(() => {
                    throw new Error('Nie udało się załadować. Spróbuj ponownie później!');
                });
            if(!response.ok) {
                throw new Error('Nie udało się załadować. Spróbuj ponownie później!');
            }
            const jsonResponse = await response.json();
            this.imgUrl = jsonResponse.url;
            this.author = jsonResponse.copyright;
            this.explanation = jsonResponse.explanation;
            this.title = jsonResponse.title;
            this.fullResUrl = jsonResponse.hdurl;
            const responseInPolish = await fetch("https://api-free.deepl.com/v2/translate?text=" + jsonResponse.explanation+"&target_lang=PL&auth_key=176e7b50-265d-7c1a-7f29-4ca842660fc7:fx", {
                "method": "POST",
            })

            if(!responseInPolish.ok) {
                this.isLoading = false;
                return;
            }
            const translatedInfo = await responseInPolish.json();
            this.explanation = translatedInfo.translations[0].text;
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.photo {
  width: 80%;
  max-width: 900px;
  border-radius: 20px;
}
a {
  color: #ef3dff;
}
@media (max-width: 600px) {
    .photo {
        width: 95%;
    }
}
</style>