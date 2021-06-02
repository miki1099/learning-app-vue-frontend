<template>
    <div class="radio">
            <input type="radio" id="konst" value="k" v-model="picked" label="Konstelacje gwiezdne">
            <input type="radio" id="konst" value="p" v-model="picked" label="Podstawy astronomii">
            <input type="radio" id="konst" value="all" v-model="picked" label="Wszystko">
            <input class="text" type="text" v-model="filter">
    </div>
    <div class="list">
        <div v-for="obj in showArray" :key="obj.name">
            <!-- <a :class="{blueHover: obj.id % 2 === 1}" :href="obj.link" target="_blank">{{ obj.name }}</a> -->
            <base-card mode="dark"><a :class="{blueHover: obj.id % 2 === 1}" :href="obj.link" target="_blank">{{ obj.name }}</a></base-card>
        </div>
    </div>
</template>

<script>
import BaseCard from '../../components/UI/BaseCard.vue';
export default {
  components: { BaseCard },
    data() {
        return {
            //  {id: null, link: '', name: '', category: 'k'},
            filter: '',
            picked: 'all',
            wikiArray: [
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Cefeusza', name: 'Cefeusz', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Kasjopei', name: 'Kasjopeja', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Ma%C5%82a_Nied%C5%BAwiedzica', name: 'Mała Niedźwiedzica', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Smoka', name: 'Smok', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Wielka_Nied%C5%BAwiedzica', name: 'Wielka Niedźwiedzica', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_%C5%BByrafy', name: 'Żyrafa', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Bli%C5%BAni%C4%85t', name: 'Bliźnięta', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Hydry', name: 'Hydra', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Jednoro%C5%BCca', name: 'Jednorożec', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Kompasu', name: 'Kompas', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Lwa', name: 'Lew', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Ma%C5%82y_Lew', name: 'Mały Lew', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Ma%C5%82y_Pies', name: 'Mały Pies', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Pompy', name: 'Pompa', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Pucharu', name: 'Puchar', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Raka', name: 'Rak', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Rufy', name: 'Rufa', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Rysia', name: 'Ryś', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Sekstantu', name: 'Sekstant', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Wielki_Pies', name: 'Wielki Pies', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_%C5%BBagla', name: 'Żagiel', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Centaura', name: 'Centaur', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Herkulesa', name: 'Herkules', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Korona_P%C3%B3%C5%82nocna', name: 'Korona Północna', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Kruka', name: 'Kruk', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_O%C5%82tarza', name: 'Ołtarz', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Panny', name: 'Panna', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Ps%C3%B3w_Go%C5%84czych', name: 'Psy Gończe', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Skorpiona', name: 'Skorpion', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Wagi', name: 'Waga', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Warkocz_Bereniki', name: 'Warkocz Bereniki', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_W%C4%99%C5%BCa', name: 'Wąż', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_W%C4%99gielnicy', name: 'Węgielnica', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_W%C4%99%C5%BCownika', name: 'Wężownik', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Wilka', name: 'Wilk', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Wolarza', name: 'Wolarz', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Delfina', name: 'Delfin', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Indianina', name: 'Indianin', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Jaszczurki', name: 'Jaszczurka', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Korona_Po%C5%82udniowa', name: 'Korona Południowa', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Kozioro%C5%BCca', name: 'Koziorożec', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Liska', name: 'Lisek', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Lunety', name: 'Luneta', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Lutni', name: 'Lutnia', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_%C5%81ab%C4%99dzia', name: 'Łabędź', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Mikroskopu', name: 'Mikroskop', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Or%C5%82a', name: 'Orzeł', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Pegaza', name: 'Pegaz', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Ryba_Po%C5%82udniowa', name: 'Ryba Południowa', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Strza%C5%82y', name: 'Strzała', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Strzelca', name: 'Strzelec', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Tarczy', name: 'Tarcza', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Wodnika', name: 'Wodnik', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_%C5%B9rebi%C4%99cia', name: 'Źrebię', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_%C5%BBurawia', name: 'Żuraw', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Andromedy', name: 'Andromeda', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Barana', name: 'Baran', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Byka', name: 'Byk', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Erydanu', name: 'Erydan', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Feniksa', name: 'Feniks', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Go%C5%82%C4%99bia', name: 'Gołąb', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Malarza', name: 'Malarz', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Oriona', name: 'Orion', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Perseusza', name: 'Perseusz', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Pieca', name: 'Piec', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Ryb', name: 'Ryby', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Rylca', name: 'Rylec', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Rze%C5%BAbiarza', name: 'Rzeźbiarz', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Tr%C3%B3jk%C4%85ta', name: 'Trójkąt', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Wieloryba', name: 'Wieloryb', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Wo%C5%BAnicy', name: 'Woźnica', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Zaj%C4%85ca', name: 'Zając', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Zegara', name: 'Zegar', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Cyrkla', name: 'Cyrkiel', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_G%C3%B3ry_Sto%C5%82owej', name: 'Góra Stołowa', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Kameleona', name: 'Kameleon', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Kila', name: 'Kil', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Krzy%C5%BCa_Po%C5%82udnia', name: 'Krzyż Południa', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Muchy', name: 'Mucha', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Oktanta', name: 'Oktant', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Pawia', name: 'Paw', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Ptak_Rajski', name: 'Ptak Rajski', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Ryba_Lataj%C4%85ca', name: 'Ryba Latająca', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Sieci', name: 'Sieć', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Tr%C3%B3jk%C4%85t_Po%C5%82udniowy', name: 'Trójkąt Południowy', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazdozbi%C3%B3r_Tukana', name: 'Tukan', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/W%C4%85%C5%BC_Wodny', name: 'Wąż Wodny', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Z%C5%82ota_Ryba', name: 'Złota Ryba', category: 'k'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/S%C5%82o%C5%84ce', name: 'Słońce', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Uk%C5%82ad_S%C5%82oneczny', name: 'Układ Słoneczny', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Merkury', name: 'Merkury', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Wenus', name: 'Wenus', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Ziemia', name: 'Ziemia', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Mars', name: 'Mars', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Jowisz', name: 'Jowisz', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Saturn', name: 'Saturn', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Uran', name: 'Uran', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Neptun', name: 'Neptun', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Astronomiczne_jednostki_odleg%C5%82o%C5%9Bci', name: 'Jednostki astronomiczne', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Kometa', name: 'Kometa', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Meteor', name: 'Meteor', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Meteoryt', name: 'Meteoryt', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Galaktyka', name: 'Galaktyka', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Miko%C5%82aj_Kopernik', name: 'Mikołaj Kopernik', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/(134340)_Pluton', name: 'Pluton', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Astronomia', name: 'Astronomia', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazda', name: 'Gwiazda', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Gwiazda_zmienna#:~:text=Gwiazda%20zmienna%20%E2%80%93%20gwiazda%2C%20kt%C3%B3ra%20w%20znacz%C4%85cy%20spos%C3%B3b%20zmienia%20swoj%C4%85%20jasno%C5%9B%C4%87.', name: 'Gwiazda zmienna', category: 'p'},
                {id: null, link: 'https://pl.wikipedia.org/wiki/Teleskop', name: 'Teleskop', category: 'p'},
            ],
        }
    }, 
    computed: {
        showArray() {
            
            let bufArray =[];
            const ctFilter = this.filter.toLowerCase();
            let isFilter = false;

            if(ctFilter !== '') isFilter = true;


            for(let obj in this.wikiArray) {
                const currName = this.wikiArray[obj].name.toLowerCase();
                if(this.picked !== 'all') {
                    if(this.wikiArray[obj].category === this.picked) {
                        if(!isFilter) bufArray.push(this.wikiArray[obj]);
                        else {
                            if(currName.includes(ctFilter)) {
                                bufArray.push(this.wikiArray[obj]);
                            }
                        }
                    }
                } else {
                    if(!isFilter) bufArray.push(this.wikiArray[obj]);
                    else {
                        if(currName.includes(ctFilter)) {
                            bufArray.push(this.wikiArray[obj]);
                        }
                    }
                }
            }

            // if(this.filter !== '') {
            //     for(let obj in this.wikiArray) {
            //     if(this.wikiArray[obj].name.includes(this.filter)) {
            //             bufArray.push(this.wikiArray[obj]);
            //     }
            // }
            // }

            bufArray.sort(function(a,b) {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            let inc = 1;
            for(let obj in bufArray) {
                bufArray[obj].id = inc;
                inc++;
            }

            return bufArray;
        }
    }
}
</script>

<style scoped>

.radio {
    display: flex;
	justify-content: space-between;
	align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
	background: #454857;
	padding: 4px;
	border-radius: 3px;
	position: relative;
}

.radio input {
	width: auto;
	height: 100%;
	appearance: none;
	outline: none;
	cursor: pointer;
	border-radius: 2px;
	padding: 4px 8px;
	background: #454857;
	color: #bdbdbdbd;
	transition: all 100ms linear;
}

.radio input:checked {
	background-image: linear-gradient(180deg, #46fa3c, #3af0cb);
	color: #fff;
	box-shadow: 0 1px 1px #0000002e;
	text-shadow: 0 1px 0px #79485f7a;
}

.radio input:before {
	content: attr(label);
	display: inline-block;
	text-align: center;
	width: 100%;
}
.text {
    color: #e9e9e9;
}

* {
    display:  flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}


.list {
    display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.list div {
    margin: 10px 0;
}

a {
    text-decoration: none;
    color: #e9e9e9;
    margin: 0 30px;
    border-radius: 10px;
    border-style: solid;
    border-color: transparent;
    border-width: 2px;
    transition: 0.4s;
}
a:hover {
    color:#ef3dff;
    border-color: #ef3dff;
    background-color: #242424;
    box-shadow: 0 0 5px #ef3dff, 0 0 25px #ef3dff, 0 0 50px #ef3dff;
    
}

.blueHover:hover {
    color:#03e9f4;
    border-color: #03e9f4;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4;
}

@media (max-width: 300px) {
    .list {
  grid-template-columns: repeat(1, 1fr);
}
}
</style>