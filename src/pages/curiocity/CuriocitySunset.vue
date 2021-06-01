<template>
    <base-dialog :show="!!error" title="Error" @close="handleErrorOrGoHome">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading" />
    <div class="main" v-if="!isLoading">
        <h2 v-if="!isAutomaticLocationGet">Wpisz ręcznie swoje położenie</h2>
        <h2 v-else>Możesz również wpisać ręcznie położenie</h2>
        <p v-if="!isAutomaticLocationGet">Automatyczne wykrycie lokalizacji nie działało, możesz spróbować jeszcze raz lub wpisać ręcznie</p>
        <base-button @click="getLocation()">Udostepnij lokalizację</base-button>
        <br>
        <br>
        <form @submit.prevent="getSunset(latitudeBuf, longitudeBuf)">
                <div class="user-box">
                <input type="number" step="any" name="" required="" v-model="latitudeBuf" class="valid">
                <label>Szerokość</label>
            </div>
            <div class="user-box">
                <input type="number" step="any" name="" required="" v-model="longitudeBuf" class="valid">
                <label>Długość</label>
            </div>
            <base-button>Zatwierdź</base-button>
            </form>
        <div v-if="isLocationGet" class="sun-info">
            <div class="side">
                <svg height="90px" width="90px"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
<g>
	<path style="fill:#F0C419;" d="M30,3c-0.552,0-1,0.448-1,1v6c0,0.552,0.448,1,1,1s1-0.448,1-1V4C31,3.448,30.552,3,30,3z"/>
	<path style="fill:#F0C419;" d="M59,32h-6c-0.552,0-1,0.448-1,1s0.448,1,1,1h6c0.552,0,1-0.448,1-1S59.552,32,59,32z"/>
	<path style="fill:#F0C419;" d="M7,32H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h6c0.552,0,1-0.448,1-1S7.552,32,7,32z"/>
	<path style="fill:#F0C419;" d="M52.707,10.293c-0.391-0.391-1.023-0.391-1.414,0l-5.736,5.736c-0.391,0.391-0.391,1.023,0,1.414
		c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l5.736-5.736C53.098,11.316,53.098,10.684,52.707,10.293z"/>
	<path style="fill:#F0C419;" d="M8.707,10.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l5.736,5.736
		c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L8.707,10.293z"/>
	<path style="fill:#F0C419;" d="M54.854,22.45c-0.216-0.508-0.804-0.746-1.311-0.53l-2.762,1.172
		c-0.508,0.216-0.746,0.803-0.53,1.311c0.162,0.381,0.532,0.61,0.921,0.61c0.13,0,0.263-0.026,0.39-0.08l2.762-1.172
		C54.832,23.545,55.069,22.958,54.854,22.45z"/>
	<path style="fill:#F0C419;" d="M9.049,23.457l-2.782-1.124c-0.512-0.207-1.095,0.04-1.302,0.553
		c-0.207,0.512,0.041,1.095,0.553,1.302L8.3,25.312c0.123,0.049,0.25,0.073,0.374,0.073c0.396,0,0.771-0.236,0.928-0.626
		C9.809,24.247,9.562,23.664,9.049,23.457z"/>
	<path style="fill:#F0C419;" d="M20.761,8.676c-0.216-0.509-0.804-0.747-1.311-0.53c-0.508,0.216-0.746,0.803-0.53,1.311
		l1.172,2.762c0.162,0.381,0.532,0.61,0.921,0.61c0.13,0,0.263-0.026,0.39-0.08c0.508-0.216,0.746-0.803,0.53-1.311L20.761,8.676z"
		/>
	<path style="fill:#F0C419;" d="M40.114,7.966c-0.511-0.207-1.095,0.041-1.302,0.553L37.688,11.3
		c-0.207,0.512,0.041,1.095,0.553,1.302c0.123,0.049,0.25,0.073,0.374,0.073c0.396,0,0.771-0.236,0.928-0.626l1.124-2.782
		C40.874,8.756,40.626,8.173,40.114,7.966z"/>
</g>
<path style="fill:#F0C419;" d="M48.325,41C49.396,38.549,50,35.846,50,33c0-11.046-8.954-20-20-20s-20,8.954-20,20
	c0,2.846,0.604,5.549,1.675,8H48.325z"/>
<path style="fill:#EDE21B;" d="M42.673,41C44.139,38.683,45,35.945,45,33c0-8.284-6.716-15-15-15s-15,6.716-15,15
	c0,2.945,0.861,5.683,2.327,8H42.673z"/>
<g>
	<path style="fill:#F29C1F;" d="M59,40H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h58c0.552,0,1-0.448,1-1S59.552,40,59,40z"/>
	<path style="fill:#F29C1F;" d="M54,45H6c-0.552,0-1,0.448-1,1s0.448,1,1,1h48c0.552,0,1-0.448,1-1S54.552,45,54,45z"/>
	<path style="fill:#F29C1F;" d="M49,50H11c-0.552,0-1,0.448-1,1s0.448,1,1,1h38c0.552,0,1-0.448,1-1S49.552,50,49,50z"/>
	<path style="fill:#F29C1F;" d="M45,55H15c-0.552,0-1,0.448-1,1s0.448,1,1,1h30c0.552,0,1-0.448,1-1S45.552,55,45,55z"/>
</g>
<polygon style="fill:#546A79;" points="37.707,29.879 30,22.172 22.293,29.879 23.707,31.293 29,26 29,37.586 31,37.586 31,26 
	36.293,31.293 "/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

                <p>Wschód: {{ information.results.sunrise.toLocaleTimeString()}}</p>
                <p>Świt cywilny: {{ information.results.civil_twilight_begin.toLocaleTimeString()}}</p>
                <p>Świt żeglarski: {{ information.results.nautical_twilight_begin.toLocaleTimeString()}}</p>
                <p>Świt astronomiczny: {{ information.results.astronomical_twilight_begin.toLocaleTimeString() === 'Invalid Date'? "--:--:--" : information.results.astronomical_twilight_begin.toLocaleTimeString()}}</p>
            </div>
            <div class="side">
<svg height="90px" width="90px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
<g>
	<path style="fill:#F0C419;" d="M30,3c-0.552,0-1,0.448-1,1v6c0,0.552,0.448,1,1,1s1-0.448,1-1V4C31,3.448,30.552,3,30,3z"/>
	<path style="fill:#F0C419;" d="M59,32h-6c-0.552,0-1,0.448-1,1s0.448,1,1,1h6c0.552,0,1-0.448,1-1S59.552,32,59,32z"/>
	<path style="fill:#F0C419;" d="M7,32H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h6c0.552,0,1-0.448,1-1S7.552,32,7,32z"/>
	<path style="fill:#F0C419;" d="M52.707,10.293c-0.391-0.391-1.023-0.391-1.414,0l-5.736,5.736c-0.391,0.391-0.391,1.023,0,1.414
		c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l5.736-5.736C53.098,11.316,53.098,10.684,52.707,10.293z"/>
	<path style="fill:#F0C419;" d="M8.707,10.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l5.736,5.736
		c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L8.707,10.293z"/>
	<path style="fill:#F0C419;" d="M54.854,22.45c-0.216-0.508-0.804-0.746-1.311-0.53l-2.762,1.172
		c-0.508,0.216-0.746,0.803-0.53,1.311c0.162,0.381,0.532,0.61,0.921,0.61c0.13,0,0.263-0.026,0.39-0.08l2.762-1.172
		C54.832,23.545,55.069,22.958,54.854,22.45z"/>
	<path style="fill:#F0C419;" d="M9.049,23.457l-2.782-1.124c-0.512-0.207-1.095,0.04-1.302,0.553
		c-0.207,0.512,0.041,1.095,0.553,1.302L8.3,25.312c0.123,0.049,0.25,0.073,0.374,0.073c0.396,0,0.771-0.236,0.928-0.626
		C9.809,24.247,9.562,23.664,9.049,23.457z"/>
	<path style="fill:#F0C419;" d="M20.761,8.676c-0.216-0.509-0.804-0.747-1.311-0.53c-0.508,0.216-0.746,0.803-0.53,1.311
		l1.172,2.762c0.162,0.381,0.532,0.61,0.921,0.61c0.13,0,0.263-0.026,0.39-0.08c0.508-0.216,0.746-0.803,0.53-1.311L20.761,8.676z"
		/>
	<path style="fill:#F0C419;" d="M40.114,7.966c-0.511-0.207-1.095,0.041-1.302,0.553L37.688,11.3
		c-0.207,0.512,0.041,1.095,0.553,1.302c0.123,0.049,0.25,0.073,0.374,0.073c0.396,0,0.771-0.236,0.928-0.626l1.124-2.782
		C40.874,8.756,40.626,8.173,40.114,7.966z"/>
</g>
<path style="fill:#F0C419;" d="M48.325,41C49.396,38.549,50,35.846,50,33c0-11.046-8.954-20-20-20s-20,8.954-20,20
	c0,2.846,0.604,5.549,1.675,8H48.325z"/>
<path style="fill:#EDE21B;" d="M42.673,41C44.139,38.683,45,35.945,45,33c0-8.284-6.716-15-15-15s-15,6.716-15,15
	c0,2.945,0.861,5.683,2.327,8H42.673z"/>
<g>
	<path style="fill:#F29C1F;" d="M59,40H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h58c0.552,0,1-0.448,1-1S59.552,40,59,40z"/>
	<path style="fill:#F29C1F;" d="M54,45H6c-0.552,0-1,0.448-1,1s0.448,1,1,1h48c0.552,0,1-0.448,1-1S54.552,45,54,45z"/>
	<path style="fill:#F29C1F;" d="M49,50H11c-0.552,0-1,0.448-1,1s0.448,1,1,1h38c0.552,0,1-0.448,1-1S49.552,50,49,50z"/>
	<path style="fill:#F29C1F;" d="M45,55H15c-0.552,0-1,0.448-1,1s0.448,1,1,1h30c0.552,0,1-0.448,1-1S45.552,55,45,55z"/>
</g>
<polygon style="fill:#546A79;" points="36.293,28.293 31,33.586 31,22 29,22 29,33.586 23.707,28.293 22.293,29.707 30,37.414 
	37.707,29.707 "/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

                <p>Zachód: {{ information.results.sunset.toLocaleTimeString()}}</p>
                <p>Zmierzch cywilny: {{ information.results.civil_twilight_end.toLocaleTimeString()}}</p>
                <p>Zmierzch żeglarski: {{ information.results.nautical_twilight_end.toLocaleTimeString()}}</p>
                <p>Zmierzch astronomiczny: {{ information.results.astronomical_twilight_end.toLocaleTimeString() === 'Invalid Date'? "--:--:--" : information.results.astronomical_twilight_end.toLocaleTimeString()}}</p>
            </div>
        </div>
    </div>

</template>

<script>
function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
export default {
    data() {
        return {
            latitude: null,
            longitude: null,
            latitudeBuf: null,
            longitudeBuf: null,
            information: null,
            isAutomaticLocationGet: false,
            isLoading: true,
            isLocationGet: false,
            error: null,
        }
    },
    created() {
        this.getLocation();
    },
    methods: {
        handleErrorOrGoHome() {
            this.$router.push('/home');
        },
        async getLocation() {
            if(!("geolocation" in navigator)) {
                this.error = "Geolokacja nie jest obsługiwana!";
                return;
            }
            this.isLoading = true;

            await navigator.geolocation.getCurrentPosition(pos => {
                this.latitude = pos.coords.latitude;
                this.longitude = pos.coords.longitude;
                this.latitudeBuf = this.latitude;
                this.longitudeBuf = this.longitude;
                this.isAutomaticLocationGet = true;
                this.getSunset(this.latitude, this.longitude);
            }, () => {
                this.isAutomaticLocationGet = false;
            });
            this.isLoading = false;
        },
        async getSunset(latitude, longitude) {
            this.isLoading = true;
            const response = await fetch(
                'https://api.sunrise-sunset.org/json?lat=' + latitude + '&lng='+ longitude + '&formatted=0',
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                this.error = "Nie udało się załadować danych spróbój ponownie później!";
                return;
            } else {
                let data = await response.json();
                if(data.results.astronomical_twilight_begin.substring(0, 4) === '1970') {
                    data.results.astronomical_twilight_begin = Date.parse("1970-01-02T00:00:01+00:00");
                    data.results.astronomical_twilight_end = Date.parse("1970-01-02T00:00:01+00:00");
                }
                data.results.sunrise = convertTZ(data.results.sunrise, "Europe/Warsaw");
                data.results.sunset = convertTZ(data.results.sunset, "Europe/Warsaw");
                data.results.civil_twilight_begin = convertTZ(data.results.civil_twilight_begin, "Europe/Warsaw");
                data.results.solar_noon = convertTZ(data.results.solar_noon, "Europe/Warsaw");
                data.results.civil_twilight_end = convertTZ(data.results.civil_twilight_end, "Europe/Warsaw");
                data.results.nautical_twilight_begin = convertTZ(data.results.nautical_twilight_begin, "Europe/Warsaw");
                data.results.nautical_twilight_end = convertTZ(data.results.nautical_twilight_end, "Europe/Warsaw");
                data.results.astronomical_twilight_begin = convertTZ(data.results.astronomical_twilight_begin, "Europe/Warsaw");
                data.results.astronomical_twilight_end = convertTZ(data.results.astronomical_twilight_end, "Europe/Warsaw");
                this.information = data
                this.isLocationGet = true;
            }
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.sun-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}

.side {
    margin: 10px 50px;
}

form {
    width: 40%;
}
.user-box {
  position: relative;
}

.user-box input {
  width: 100%;
}

.user-box .valid {
  padding: 10px 0;
  font-size: 16px;
  color: #e9e9e9;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
  outline: none;
  background: transparent;
}
.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 0.9rem;
  color: #e9e9e9;
  pointer-events: none;
  transition: 0.5s;
}

.user-box input:focus ~ label,
.user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #ef3dff;
  font-size: 15px;
}

form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ef3dff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 10px;
  letter-spacing: 4px;
}
@media (max-width: 600px) {
    form {
    width: 100%;
}
  .user-box label {
    left: 0;
  }
  .user-box input:focus ~ label,
  .user-box input:valid ~ label {
    left: 0;
  }
}
</style>