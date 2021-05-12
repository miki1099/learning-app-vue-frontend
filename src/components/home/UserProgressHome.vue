<template>
    <base-card mode="dark" class="all" v-if="isGood">
    <base-spinner v-if="isLoading"/>
    <div  class="pointer" v-if="!isLoading">
        <div @click="$router.push('/learn/constelations')" class="block">
            <base-circle-counter class="circle" :activeCount="constelation" width="5rem" height="5rem" :text="constelation + '%'"/>
            <label>Konstelacje gwiezdne</label>
        </div>
        <div @click="$router.push('/learn/basicAstronomy')" class="block">
            <base-circle-counter class="circle" :activeCount="astronomy" width="5rem" height="5rem" :text="astronomy + '%'"/>
            <label>Podstawy astronomii</label>
        </div>
        <div @click="$router.push('/learn/other')" class="block">
            <base-circle-counter class="circle" :activeCount="other" width="5rem" height="5rem" :text="other + '%'"/>
            <label>Inne</label>
        </div>
        <div @click="$router.push('/learn/all')" class="block">
            <base-circle-counter class="circle" :activeCount="all" width="5rem" height="5rem" :text="all + '%'"/>
            <label>Wszystko</label>
        </div>
        <label @click="$router.push('/learn')">Ucz się</label>
    </div>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            photo: null,
            isLoading: false,
            isGood: true,
            constelation: 0,
            astronomy: 0,
            other: 0,
            all: 0,
        }
    },
    created() {
        this.getScores("Konstelacje gwiezdne").then(value => {
            this.constelation = value;
        });
        this.getScores("Podstawy astronomii").then( value => {
            this.astronomy = value;
        });
        this.getScores("Inne").then( value => {
            this.other = value;
        });
        this.getScores(null).then( value => {
            this.all = value;
        });
    },
    methods: {
        async getScores(category) {
            this.isLoading = true;

            let headers = new Headers();
            const token = this.$store.getters.getToken;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);

            let response;
            if(category === null) {
                response = await fetch('https://learning-app-stars.herokuapp.com/user/questionPercentageLearned', {
                    method: 'GET',
                    headers: headers,
                }).catch( () => {
                    this.isGood = false;
                })
            } else {
                response = await fetch('https://learning-app-stars.herokuapp.com/user/questionPercentageLearned?category=' + category, {
                    method: 'GET',
                    headers: headers,
                }).catch( () => {
                    this.isGood = false;
                })
            }
            

            if(!response.ok) {
                this.isGood = false;
            }
            const jsonResponse = await response.json();
            this.isLoading = false;
            return Math.round(jsonResponse);
        } 
    }
}
</script>

<style scoped>
.all {
    max-width: 45%;
}

.block {
    display: flex;
    justify-content: left;
    align-items: center;
}

.circle {
    margin: 10px 10px 10px 0;
}

 .pointer label,  .pointer div {
    cursor: pointer;
}
.pointer img {
    width: 100%;
}

label:hover {
    color: #ef3dff;
}

@media (max-width: 900px) {
    .all {
    max-width: 90%;
}
}
</style>