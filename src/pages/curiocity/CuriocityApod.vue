<template>
    <base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>

    <div class="main" v-if="!isLoading">
        <h2>{{ title }}</h2>
        <img class="photo" v-if="!isVideo" :src="imgUrl" />
        <iframe class="photo video" v-else
            :src="imgUrl">
        </iframe>
        <p>{{ explanation }}</p>
        <a target="_blank" :href="fullResUrl">Link do zdjęcia w pełnym wymiarze</a>
        <p v-if="!!author">Autor: {{ author }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: null,
            ytUrl: null,
            author: null,
            explanation: null,
            fullResUrl: null,
            isVideo: false,
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

            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=99LaV7JpFe2ObOwzsdumuGhR5qMHKnP1nHvuq1VX', {
                    method: 'GET',
                }).catch(() => {
                     this.error = 'Nie udało się załadować. Spróbuj ponownie później!';
                    throw new Error('Nie udało się załadować. Spróbuj ponownie później!');
                });
            if(!response.ok) {
                this.error = 'Nie udało się załadować. Spróbuj ponownie później!';
                throw new Error('Nie udało się załadować. Spróbuj ponownie później!');
            }
            const jsonResponse = await response.json();
            if(jsonResponse.media_type === 'video') {
                this.isVideo = true;
            }
            this.imgUrl = jsonResponse.url;
            this.author = jsonResponse.copyright;
            this.explanation = jsonResponse.explanation;
            this.title = jsonResponse.title;
            this.fullResUrl = jsonResponse.hdurl;
            const responseInPolish = await fetch("https://api-free.deepl.com/v2/translate?text=" + jsonResponse.explanation+"&target_lang=PL&auth_key=383d50c9-7013-84bb-f0c8-11f3b7453022:fx", {
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
.video {
    height: 600px;
}

@media (max-width: 600px) {
    .photo {
        width: 95%;
    }
}
</style>
