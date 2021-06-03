<template>
  <base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
    <p>{{ error }}</p>
  </base-dialog>
  <base-spinner v-if="isLoading" />
  <div class="score-table" v-if="!isLoading">
    <h2>Twoje wyniki z testów:</h2>
    <table>
      <tr>
        <th class="sort-by pointer" @click="sortByScore">Wynik</th>
        <th class="sort-by pointer" @click="sortByDate">Data</th>
        <th>Kategoria</th>
        <th>Czas testu [s]</th>
      </tr>
      <tr v-for="score in scoreList" :key="score.id">
        <td>{{ score.score }}</td>
        <td>{{ score.scoreDate }}</td>
        <td>{{ score.category }}</td>
        <td>{{ score.testTime }}</td>
      </tr>
    </table>
  </div>
  <div class="nav" v-if="!isLoading && maxSiteNumber != 0" >
    <span :class="{disable: currentPage === 0}" @click="navMethod(currentPage - 1)">poprzednia strona</span>
    <span :class="{disable: currentPage === 0}" @click="navMethod(0)">1</span>
    <div v-for="pageNumber in pageChange" :key="pageNumber">
      <span :class="{disable: pageNumber === currentPage+1}" @click="navMethod(pageNumber-1)">{{ pageNumber }}</span>
    </div>
    <span v-if="maxSiteNumber != 1" :class="{disable: currentPage === maxSiteNumber-1}" @click="navMethod(maxSiteNumber - 1)">{{ maxSiteNumber }}</span>
    <span :class="{disable: currentPage === maxSiteNumber-1}" @click="navMethod(currentPage + 1)">następna strona</span>
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
  created() {
    this.loadScoreList(false, this.scoreAsc, 0);
  },
  computed: {
    pageChange() {
      let pages = [];
      for(let i = this.currentPage+1 - 2; i <= this.currentPage+1+2; i++) {
        if(i >= 2 && i <= this.maxSiteNumber-1) {
          pages.push(i);
        }
      }
      console.log(pages);
      return pages;
    }
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
      const pageCountResponse = await fetch(
        'https://learning-app-stars.herokuapp.com/score/getPageCount/' +
          userId +
          '?size=10',
        {
          method: 'GET',
          headers: headers,
        }
      );
      this.maxSiteNumber = await pageCountResponse.json();
      if (!pageCountResponse.ok) {
        if (pageCountResponse.status === 401) {
          this.$router.replace('/login');
        }
        throw new Error('Nie można załadować wyników, spróbuj później!');
      }

      if (getScoreByDate) {
        response = await fetch(
          'https://learning-app-stars.herokuapp.com/score/userScoreByDate?page=' +
            page +
            '&size=10&sortByAsc=' +
            sortByAsc +
            '&userId=' +
            userId,
          {
            method: 'GET',
            headers: headers,
          }
        );
      } else {
        response = await fetch(
          'https://learning-app-stars.herokuapp.com/score/userScoreByScore?page=' +
            page +
            '&size=10&sortByAsc=' +
            sortByAsc +
            '&userId=' +
            userId,
          {
            method: 'GET',
            headers: headers,
          }
        );
      }
      if (!response.ok) {
        if (response.status === 401) {
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
      if(page === -1 || page === 0 && this.currentPage === 0 || page === this.maxSiteNumber || this.currentPage === this.maxSiteNumber -1 && page === this.maxSiteNumber -1) {
        return;
      }

      this.currentPage = page;
      if (this.orderByDate === false) {
        this.loadScoreList(false, this.scoreAsc, this.currentPage);
      } else {
        this.loadScoreList(true, this.dateAsc, this.currentPage);
      }
    },
  },
};
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
  overflow-x: auto;
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
.nav span:not(.disable) {
  cursor: pointer;
}

.nav .disable {
  opacity: 20%;
}

.nav span:not(.disable):hover {
  color: #ef3dff;
}
td,
th {
  padding: 4px;
  /* border: 1px dotted rgb(133, 0, 0); */
  overflow: hidden;
  text-align: left;
  vertical-align: middle;
}
th {
  background-color: #273135;
  font-weight: 400;
}
.pointer {
  cursor: pointer;
}
.pointer:hover {
  background: #485b62;
}
tr:nth-child(even) {
  background: #646b6d;
}
tr:nth-child(odd) {
  background: #344146;
}

tr:nth-child(even):hover {
  background: #5a7079;
}

tr:nth-child(odd):hover {
  background: #5f7781;
}

.sort-by {
  padding-right: 18px;
  position: relative;
}
.sort-by:before,
.sort-by:after {
  border: 4px solid transparent;
  content: '';
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
@media (max-width: 800px) {
  .nav {
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    flex-wrap: wrap;
  }
  .nav span {
    font-size: 1.5rem;
    margin: 10px 0;
  }
  .nav div span {
    font-size: 1.5rem;
    margin: 10px 0;
  }
}

@media (max-width: 420px) {
  .score-table {
  padding: 0 0px;
}


}
</style>