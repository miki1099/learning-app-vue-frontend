<template>
  <base-spinner v-if="isLoading"/>
  <div v-else>
    <h4> Jest {{ usersRegistered }} zarejestrowanych użytkowników</h4>
    <h4> Średni wynik wszystkich testów użytkowników to: {{ averageAllUsersScoreTest }}</h4>
    <h4> W ciągu ostatnich 30 dni zostało wykonanych {{ testsMadeInLast30Days }} testów </h4>
  </div>
  <h2>Co chcesz zrobić?</h2>
  <base-button>
    <router-link class="link" to="/admin/createQuestion">
      Stwórz nowe pytanie
    </router-link>
  </base-button>
  <base-button>
    <router-link class="link" to="/admin/banUser">
      Zablokuj/Odblokuj użytkownika
    </router-link>
  </base-button>
</template>

<script>

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export default {
  data() {
    return {
      isLoading: false,
      usersRegistered: 0,
      averageAllUsersScoreTest: 0,
      testsMadeInLast30Days: 0
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let headers = new Headers();
            const token = this.$store.getters.getToken;
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);
            let response = await fetch('https://learning-app-stars.herokuapp.com/admin/countAllUsers', {
                    method: 'GET',
                    headers: headers,
              });
            if(!response.ok) {
                if (response.status === 401) {
                    this.$router.replace('/login');
                }
                else return;
            }
            this.usersRegistered = await response.json();

            response = await fetch('https://learning-app-stars.herokuapp.com/admin/score/avgAllUsers', {
                    method: 'GET',
                    headers: headers,
              });
            if(!response.ok) {
                if (response.status === 401) {
                    this.$router.replace('/login');
                }
                else return;
            }
            this.averageAllUsersScoreTest = await response.json();

            let nowDate = new Date();
            // const to = nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDate();
            const to = formatDate(nowDate);
            nowDate.setDate(nowDate.getDate() - 30);
            // const from = nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDate();
            const from = formatDate(nowDate);
            response = await fetch('https://learning-app-stars.herokuapp.com/admin/score/countAllBetween?fromDate=' + from + '&toDate=' + to, {
                    method: 'GET',
                    headers: headers,
              });
            if(!response.ok) {
                if (response.status === 401) {
                    this.$router.replace('/login');
                }
                else return;
            }
            this.testsMadeInLast30Days = await response.json();
            this.isLoading = false;
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
  color: #ef3dff;
}

.link2 {
  text-decoration: none;
  color: #03e9f4;
}
</style>