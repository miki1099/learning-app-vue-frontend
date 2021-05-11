<template>
    <base-card mode="dark" class="all" v-if="isGood">
    <base-spinner v-if="isLoading"/>
    <div @click="$router.push('/curiocity/apod')" class="pointer" v-if="!isLoading">
        <label class="bigger-font">{{ title }}</label>
        <img :src="photo"/>
        <label>Czytaj więcej...</label>
    </div>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            photo: null,
            title: null,
            isLoading: false,
            isGood: true,
        }
    },
    created() {
        this.getPhoto();
    },
    methods: {
        async getPhoto() {
            this.isLoading = true;

            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
                    method: 'GET',
                }).catch( () => {
                    this.isGood = false;
                })

            if(!response.ok) {
                this.isGood = false;
            }
            const jsonResponse = await response.json();
            this.photo = jsonResponse.url;
            this.title = jsonResponse.title;
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.all {
    max-width: 45%;
}

.pointer, .pointer label, .pointer img {
    cursor: pointer;
}
.pointer img {
    width: 100%;
}

label:hover {
    color: #ef3dff;
}

.bigger-font {
    font-size: 1.2rem;
}

@media (max-width: 900px) {
    .all {
    max-width: 90%;
}
}
</style>