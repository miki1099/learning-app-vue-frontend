<template>
    <base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"/>
    <div class="score-table" v-if="!isLoading">
        <h2>Twoje wyniki z testów:</h2>
        <table>
            <tr>
                <th class="sort-by pointer" @click="sortByScore">Wynik</th>
                <th class="sort-by pointer" @click="sortByDate">Data</th>
                <th>Kategoria</th>
            </tr>
            <tr v-for="score in scoreList" :key="score.id">
                <td>{{ score.score }}</td>
                <td> {{ score.scoreDate }} </td>
                <td> {{ score.category }} </td>
            </tr>
        </table>
    </div>
    <div class="nav" v-if="!isLoading">
        <span v-if="currentPage !== 0" @click="navMethod(0)">1</span>
        <span v-if="currentPage !== 0" @click="navMethod(currentPage-1)">poprzednia strona</span>
        <span v-if="currentPage !== maxSiteNumber-1 && currentPage !== maxSiteNumber-2" @click="navMethod(currentPage+1)">następna strona</span>
        <span v-if="currentPage !== maxSiteNumber-1" @click="navMethod(maxSiteNumber-1)">{{ maxSiteNumber }}</span>
    </div>
</template>

<script>
import BaseSpinner from '../../components/atoms/BaseSpinner.vue';
export default {
  components: { BaseSpinner },
    data() {
        return {
            currentPage: 0,
            maxSiteNumber: null,
            scoreList: null,
            isLoading: false,
            scoreAsc: false,
            dateAsc: true,
            orderByDate: false,
            error: null,
        };
    },
    created(){
        this.loadScoreList(false, this.scoreAsc, 0);
    },
    methods: {
        async loadScoreList(getScoreByDate, sortByAsc, page) {
            console.log('xx');
            this.isLoading = true;

            let headers = new Headers();
            const token = this.$store.getters.getToken;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);
            const userId = this.$store.getters.getUserId;
            let response = null;
            const pageCountResponse = await fetch('https://learning-app-stars.herokuapp.com/score/getPageCount/' + userId + '?size=10', {
                method: 'GET',
                headers: headers,
            });
            this.maxSiteNumber = await pageCountResponse.json();
            if(!pageCountResponse.ok) {
                if(pageCountResponse.status === 401) {
                    this.$router.replace('/login');
                }
                throw new Error('Nie można załadować wyników, spróbuj później!');
            }

            if(getScoreByDate) {
                response = await fetch('https://learning-app-stars.herokuapp.com/score/userScoreByDate?page=' + page + '&size=10&sortByAsc=' + sortByAsc + '&userId=' + userId, {
                method: 'GET',
                headers: headers,
                });
            } else {
                response = await fetch('https://learning-app-stars.herokuapp.com/score/userScoreByScore?page=' + page + '&size=10&sortByAsc=' + sortByAsc + '&userId=' + userId, {
                method: 'GET',
                headers: headers,
                });
            }
            if(!response.ok) {
                if(response.status === 401) {
                    this.$router.replace('/login');
                }
                throw new Error('Nie można załadować wyników, spróbuj później!');
            }
            this.scoreList = await response.json();
            this.isLoading = false;
        },
        sortByScore() {
            this.currentPage = 0;
            this.orderByDate = false;
            this.scoreAsc = !this.scoreAsc;
            this.loadScoreList(false, this.scoreAsc, 0);
        },
        sortByDate() {
            this.currentPage = 0;
            this.orderByDate = true;
            this.dateAsc = !this.dateAsc;
            this.loadScoreList(true, this.dateAsc, 0);
        },
        handleErrorOrGoHome() {
            this.$router.push('/home');
        },
        navMethod(page) {
            this.currentPage = page;
            if(this.orderByDate === false) {
                this.loadScoreList(false, this.scoreAsc, this.currentPage);
            } else {
                this.loadScoreList(true, this.dateAsc, this.currentPage);
            }
        }
    },
    
}
</script>

<style scoped>
.score-table {
    -moz-box-sizing: border-box;
	-o-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
    margin: 50px auto;
    padding: 0 50px;
    max-width: 960px;
}
table { 
	border-collapse: collapse;
	width: 100%;  
}
.nav {
    display: flex;
    margin: 0 20%;
    justify-content: space-around;
    align-items: center;
}
.nav span {
    cursor: pointer;
}
.nav span:hover {
    color: #ef3dff;
}
td,
th { 
	padding: 4px; 
	border: 1px dotted rgb(133, 0, 0);
	overflow: hidden;
	text-align: left;
	vertical-align: middle;
}
th { 
	background-color: #9627a0; 
	font-weight: 400;

}
.pointer {
    cursor: pointer;
}
tr:nth-child(even) {
    background: #028b92;
}
tr:nth-child(odd) {
    background: #54165a;
}
.sort-by { 
	padding-right: 18px;
	position: relative;
}
.sort-by:before,
.sort-by:after {
	border: 4px solid transparent;
	content: "";
	display: block;
	height: 0;
	right: 5px;
	top: 50%;
	position: absolute;
	width: 0;
}
.sort-by:before {
	border-bottom-color: rgb(0, 0, 0);
	margin-top: -9px;
}
.sort-by:after {
	border-top-color: rgb(0, 0, 0);
	margin-top: 1px;
}
</style>