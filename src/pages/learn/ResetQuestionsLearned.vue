<template>
    <base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <div class="all" v-if="!isLoading && !isReset">
        <h2>Czy chcesz zresetować wszystkie nauczone pytania (Nie tylko z tej kategorii)?</h2>
        <div class="buttons">
            <base-button @click="resetQuestions()">TAK</base-button>
            <base-button @click="$router.push('/learn')">NIE</base-button>
        </div>
    </div>
    <div class="all" v-if="!isLoading && isReset">
        <h2>Udało się zresetować nauczone pytania!</h2>
        <base-button @click="$router.push('/home');">Strona główna</base-button>
        <base-button @click="$router.push('/learn');">Wybór innych kategorii</base-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            isReset: false,
            error: null
        }
    },
    methods: {
            async resetQuestions() {
                this.isLoading = true;
                let headers = new Headers();  
                const token = this.$store.getters.getToken;
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                headers.append('Authorization', 'Bearer ' + token);
                await fetch('https://learning-app-stars.herokuapp.com/user/resetQuestions', {
                    method: 'PUT',
                    headers: headers,
                }).catch(() => {
                    this.error = "Nie udało się zresetować pytań spróbuj powonie później!";
                    this.isLoading = false;
                    return;
                });
                this.isReset = true;
                this.isLoading = false;
            },
            handleErrorOrGoHome() {
            this.$router.go();
        },
    }
    
}
</script>

<style scoped
BaseButtoncoped>
.all {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>