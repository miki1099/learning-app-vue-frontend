<template>
    <base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
    <p>{{ error }}</p>
  </base-dialog>
  <base-spinner v-if="isLoading" />
  <div class="score-table" v-if="!isLoading">
    <h2>Asteroidy przelatujące dzisiaj:</h2>
    <h4>LIczba: {{ countInDay }}</h4>
    <table>
      <tr>
        <th>Średnica [m]</th>
        <th>Data minięcia ziemi</th>
        <th>Prędkość [km/s]</th>
        <th>Odległość od ziemi w czasie przelotu [AU]</th>
        <th>Możliwie zagrażające ziemii</th>
      </tr>
      <tr v-for="buf in data" :key="buf.id" :class="{red: buf.is_potentially_hazardous_asteroid}">
        <td>{{ Math.round(buf.estimated_diameter.meters.estimated_diameter_min+buf.estimated_diameter.meters.estimated_diameter_max/2 * 100) / 100}}</td>
        <td>{{ buf.close_approach_data[0].close_approach_date_full }}</td>
        <td>{{ Math.round(buf.close_approach_data[0].relative_velocity.kilometers_per_second * 100) / 100 }}</td>
        <td>{{ Math.round(buf.close_approach_data[0].miss_distance.astronomical * 100) / 100 }}</td>
        <td>{{ buf.is_potentially_hazardous_asteroid? truePl:falsePl}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            countInDay: 0,
            isLoading: false,
            truePl: 'tak',
            falsePl: 'nie',
            error: null,
        };
  },
  created() {
      try {
          this.loadAsteroids();
      } catch(ex) {
          this.error = ex.message
      }
  },
  methods: {
      async loadAsteroids() {
          this.isLoading = true;
          const date = new Date().toLocaleDateString('en-CA');
            const response = await fetch('http://www.neowsapp.com/rest/v1/feed?start_date='+ date+ '&end_date=' + date+ '&detailed=false&api_key=DEMO_KEY', {
                    method: 'GET',
                }).catch(() => {
                    throw new Error('Nie udało się załadować. Spróbuj ponownie później!');
                });
            if(!response.ok) {
                throw new Error('Nie udało się załadować. Spróbuj ponownie później!');
            }
            
            const res = await response.json();
            this.countInDay = res.element_count;
            for (var key in res.near_earth_objects) {
                this.data = res.near_earth_objects[key];
            }
          this.isLoading = false;
      },
       handleErrorOrGoHome() {
            this.$router.push('/home');
        },
  }
}
</script>

<style scoped>
.score-table {
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 50px 0;
  width: 100%;
  overflow: auto;
}
table {
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  padding: 4px;
  /* border: 1px dotted rgb(133, 0, 0); */
  overflow: hidden;
  text-align: center;
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
tr:nth-child(even):not(.red) {
  background: #646b6d;
}
tr:nth-child(odd):not(.red) {
  background: #344146;
}

tr:nth-child(even):hover {
  background: #5a7079;
}

.red {
    background: #cf062e;
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
</style>