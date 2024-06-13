<template>  
  <ion-page>  
    <ion-header>  
      <ion-toolbar> 
        <!-- Logo van Axxes -->
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>  
      </ion-toolbar>  
    </ion-header> 
    <ion-content class="ion-padding"> 

      <div class="top-items-container">
        <ion-item class="top-items">  
          <!-- Datum label -->
          <ion-label class="datum-bold">Datum:</ion-label> 
          <!-- Weergave van de huidige datum -->
          <ion-text>{{ huidigeDatum }}</ion-text>  
        </ion-item> 
        
        <ion-item class="top-items">  
          <!-- Netwerk selecteren -->
          <ion-select class="network-select" label="Kies Netwerken:" v-model="geselecteerdNetwerk" @ionChange="haalNetwerkenOp">  
            <!-- Opties voor netwerkselectie -->
            <ion-select-option v-for="network in alleNetwerken" :key="network" :value="network">{{ network }}</ion-select-option> 
          </ion-select>
        </ion-item> 

        <!-- Datumkiezer -->
        <ion-item class="top-items">
          <ion-label class="datepicker-label" position="stacked">Kies Datum</ion-label>
          <ion-icon @click="toggleDatumKiezer" class="dateicon" :icon="calendar"></ion-icon>
          <ion-datetime v-if="datumKiezerTonen" display-format="DD MMM YYYY" v-model="geselecteerdeDatum" @ionChange="wijzigDatum" class="small-datetime"></ion-datetime>
        </ion-item>

        <ion-item class="top-items">
          <ion-button href="/tabs/tabMonths">Bekijk Maandelijkse Grafiek</ion-button>
        </ion-item>
      </div>

      <ion-row class="ion-justify-content-center">
        <!-- Knoppen voor weekdagen -->
        <ion-button class="weekday" v-for="day in weekdagen" :key="day.value" :class="{ 'selected': geselecteerdeDag == day.value }" @click="selecteerDag(day.value)">
          {{ day.text }}
        </ion-button>
      </ion-row>
      
      <!-- Legenda voor kleurcodes --> 
      <ion-grid class="legend">
        <ion-row class="legend-content">
          <ion-col size="auto" class="legend-item">
            <div class="legend-color zeer-druk"></div>
            <div class="legend-label">Zeer druk</div>
          </ion-col>
          <ion-col size="auto" class="legend-item">
            <div class="legend-color druk"></div>
            <div class="legend-label">Druk</div>
          </ion-col>
          <ion-col size="auto" class="legend-item">
            <div class="legend-color rustig"></div>
            <div class="legend-label">Rustig</div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="chart-container">
        <canvas id="mijnGrafiek" ref="chartCanvas"></canvas>
      </div>

      <div class="bottom-items-container">
        <ion-item class="bottom-items">
          <ion-label>Gemiddeld Login:</ion-label>
          <ion-text>{{ gemiddeldLogin }}</ion-text>
        </ion-item>
        <ion-item class="bottom-items">
          <ion-label>Drukste uur:</ion-label>
          <ion-text>{{ druksteUur }}</ion-text>
        </ion-item>
        <ion-item class="bottom-items">
          <ion-label>Kalmste uur:</ion-label>
          <ion-text>{{ kalmsteUur }}</ion-text>
        </ion-item>
      </div>


    </ion-content>  
  </ion-page> 
</template> 
  
<script setup lang="ts">  
import { IonContent, IonHeader, IonToolbar, IonLabel , IonPage, IonItem, IonText, IonSelect, IonSelectOption, IonImg, IonButton, IonGrid, IonRow,IonCol, IonDatetime, IonIcon } from '@ionic/vue';  
import axios from 'axios';  
import { ref, onMounted, computed } from 'vue'; 
import { Chart, registerables } from 'chart.js';  
import { calendar  } from 'ionicons/icons';

Chart.register(...registerables); 

// Interface voor netwerkdata
interface NetwerkData { 
  name: string; 
  capacity: number; 
} 

// Interface voor de gegevensstructuur
interface Data {  
  TimeSlot: string; 
  Locatie: string;  
  TotalLogins: number;  
} 

// Dagen van de week
const weekdagen = [
  { value: 2, text: 'Maandag' },
  { value: 3, text: 'Dinsdag' },
  { value: 4, text: 'Woensdag' },
  { value: 5, text: 'Donderdag' },
  { value: 6, text: 'Vrijdag' }
];

// Geselecteerde dag en datum
const geselecteerdeDag = ref<number>(2); 
const geselecteerdeDatum = ref<string>(new Date().toISOString().slice(0, 10)); 

// Datumkiezer aan- en uitzetten
const datumKiezerTonen = ref<boolean>(false);

const toggleDatumKiezer = () => {
  datumKiezerTonen.value = !datumKiezerTonen.value;
}
  
// Dag selecteren en bijwerken
const selecteerDag = (index: any) => { 
  geselecteerdeDag.value = index;  
  const huidigeDatum = new Date(geselecteerdeDatum.value);
  huidigeDatum.setDate(huidigeDatum.getDate() + (index - huidigeDatum.getDay()));
  geselecteerdeDatum.value = huidigeDatum.toISOString().slice(0, 10);
  console.log(index);
  wijzigDag();  

};  
  
// Datum wijzigen
const wijzigDatum = (): Date => {
  const geselecteerdeDatumPicker = new Date(geselecteerdeDatum.value);
  const day = geselecteerdeDatumPicker.getDate();
  const month = geselecteerdeDatumPicker.getMonth() + 1;
  const year = geselecteerdeDatumPicker.getFullYear();
  controleerGegevens(geselecteerdNetwerk.value, day, month, year );
  return geselecteerdeDatumPicker;
};

// Controleer op beschikbare gegevens voor de geselecteerde datum
const controleerGegevens = (locatie: string, day: number, month: number, year: number) => {
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePicker.php', { locatie, day, month, year })
    .then(response => {
      if (response.status == 200 && response.data.data.length == 0) {
        haalDetailsOp(locatie, geselecteerdeDag.value);
      } else {
        haalGegevensVanDatumOp(locatie, day, month, year);
      }
    })
    .catch(error => {
      console.error('Error checking data availability:', error);
    });
};

// Wijziging van de dag
const wijzigDag = () => { 
  haalDetailsOp(geselecteerdNetwerk.value, geselecteerdeDag.value); 
};  

// Alle beschikbare netwerken
const alleNetwerken = ['Guest Axxes - AT Recruitm','Entrepot 9', 'airtame', 'Guest Axxes', 'Staff - Axxes', 'Training Axxes', 'Labo' ]; 
  
// Netwerkgegevens
const netwerkData: Record<string, NetwerkData> = {  
  'Guest Axxes - AT Recruitm': { name: 'Guest Axxes - AT Recruitm', capacity: 80 }, 
  'Entrepot 9': { name: 'Entrepot 9', capacity: 80 },  
  'airtame': { name: 'airtame', capacity: 80 },  
  'Guest Axxes': { name: 'Guest Axxes', capacity: 80 },  
  'Staff - Axxes': { name: 'Staff - Axxes', capacity: 80 }, 
  'Training Axxes': { name: 'Training Axxes', capacity: 10 }, 
  'Labo': { name: 'Labo', capacity: 80 },  
};  
  
const gegevens = ref<Data[]>([]); 
const chartCanvas = ref<HTMLCanvasElement | null>(null);  
const geselecteerdNetwerk = ref<string>(alleNetwerken[0]);  
  
// Formatteer de datum
const formatteerDatum = (date: Date): string => {  
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric' 
  };  
  return date.toLocaleDateString('nl-NL', options); 
};  
  
const huidigeDatum = ref<string>(formatteerDatum(new Date()));   

// Haal de huidige dag van de week op
const haalHuidigeDagVanDeWeekOp = (): number => { 
  const huidigeDatum = new Date(); 
  return huidigeDatum.getDay() + 1;  
};  
  
// Haal netwerkgegevens op
const haalNetwerkenOp = () => {  
  const huidigeGeselecteerdeDag = geselecteerdeDag.value; 
  haalDetailsOp(geselecteerdNetwerk.value, huidigeGeselecteerdeDag);  
};  

// Haal gegevens op voor de geselecteerde datum
const haalGegevensVanDatumOp = (locatie: string, day: number, month: number, year: number) => {  
  const postData = {  
    locatie: locatie, 
    day: day,
    month: month,
    year: year
  };  
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePicker.php', postData)  
    .then(response => { 
      if (response.status == 200 && response.data.data) { 
        gegevens.value = response.data.data;  
        maakGrafiek();  
      } else {  
        console.error('Response not OK:', response);  
      } 
    })  
    .catch(error => { 
      console.error('Error fetching data:', error); 
    }); 
};  
  
// Haal details op voor de geselecteerde dag en locatie
const haalDetailsOp = (locatie: string, day: number) => {  
  const postData = {  
    locatie: locatie, 
    day: day  
  };  
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePerLocation.php', postData)  
    .then(response => { 
      if (response.status == 200 && response.data.data) { 
        gegevens.value = response.data.data;  
        maakGrafiek();  
      } else {  
        console.error('Response not OK:', response);  
      } 
    })  
    .catch(error => { 
      console.error('Error fetching data:', error); 
    }); 
};  
 
// Voer uit bij het laden van de component
onMounted(() => { 
  geselecteerdeDag.value = haalHuidigeDagVanDeWeekOp();  
  console.log(geselecteerdeDag.value);
  haalNetwerkenOp(); 
}); 
  
// Huidig uur berekenen
const huidigUur = computed(() => {  
  const now = new Date(); 
  const hour = now.getHours();  
  const isBinnenBereik = hour >= 8 && hour <= 17;  
  return {  
    hour, 
    isBinnenBereik 
  };  
}); 
  
// Maak de grafiek
const maakGrafiek = () => { 
  const ctx = chartCanvas.value;  
  if (!ctx) return; 
  const bestaandeGrafiek = Chart.getChart(ctx);  
  if (bestaandeGrafiek) {  
    bestaandeGrafiek.destroy();  
  } 
  const labels = gegevens.value.map(item => item.TimeSlot); 
  const values = gegevens.value.map(item => item.TotalLogins);  
  
  const achtergrondKleuren: string[] = [];  
  const hoverAchtergrondKleuren: string[] = []; 

  const huidigeDatum = new Date().toISOString().slice(0, 10);
  const barDatum = new Date(geselecteerdeDatum.value).toISOString().slice(0, 10);

  values.forEach((value, index) => {  
    const barUur = parseInt(labels[index].split(':')[0]);  
    const netwerkCapaciteit = netwerkData[geselecteerdNetwerk.value].capacity;  
    const bezettingsPercentage = (value / netwerkCapaciteit) * 100;  

    let kleur = 'rgb(74, 133, 143)'; 
    if (barDatum < huidigeDatum) {
      kleur = 'rgb(4, 92, 102)'; 
    } 
    
    if (barDatum > huidigeDatum) {
      kleur = 'rgb(145, 184, 189)';
    }

    if(barDatum >= huidigeDatum && barUur > huidigUur.value.hour){
      kleur = 'rgb(145, 184, 189)';
    }

     
    if (bezettingsPercentage >= 65) {  
      hoverAchtergrondKleuren.push('rgba(255, 0, 0, 0.8)');   
    } else if (bezettingsPercentage < 30) {  
      hoverAchtergrondKleuren.push('rgb(0, 171, 23)');  
    } else {  
      hoverAchtergrondKleuren.push('rgb(199, 106, 0)');   
    } 
    
    if (huidigUur.value.isBinnenBereik && huidigUur.value.hour == barUur) { 
      kleur = hoverAchtergrondKleuren[index]; 
    } 
    achtergrondKleuren.push(kleur); 
  }); 
  
// Haal het canvas element op
const canvas = document.getElementById('mijnGrafiek');

// Bereken de lettergrootte op basis van de breedte van de container
const fontSize = Math.max(Math.floor(canvas.clientWidth / 50), 10);

// Maak de grafiek met dynamische lettergrootte
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Totale aantal logins',
      data: values,
      backgroundColor: achtergrondKleuren,
      hoverBackgroundColor: hoverAchtergrondKleuren,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true, // Algehele reactievermogen inschakelen
    maintainAspectRatio: false, // Verhouding uitschakelen voor dynamische aanpassing
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false // Verberg Y-as waarden
        },
        title: {
          display: true,
          text: 'Totale aantal logins',
          font: {
            size: fontSize // Stel dynamische lettergrootte in
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Tijdslot',
          font: {
            size: fontSize // Stel dynamische lettergrootte in
          }
        }
      }
    }
  }
});
};  

// Bereken gemiddeld aantal logins per uur
const berekenGemiddeldLoginPerUur = () => {
  const dagelijkseTotalen: Record<string, number[]> = {};

  gegevens.value.forEach(item => {
    const date = item.TimeSlot.split(':')[0];
    dagelijkseTotalen[date] = dagelijkseTotalen[date] || [];
    dagelijkseTotalen[date].push(item.TotalLogins);
  });

  const gemiddeldeLoginsPerUur: Record<string, number> = {};
  Object.keys(dagelijkseTotalen).forEach(date => {
    gemiddeldeLoginsPerUur[date] = dagelijkseTotalen[date].reduce((acc, curr) => acc + curr, 0) / dagelijkseTotalen[date].length;
  });

  const totaleGemiddelde = Object.values(gemiddeldeLoginsPerUur).reduce((acc, curr) => acc + curr, 0) / Object.keys(gemiddeldeLoginsPerUur).length;
  
  return Math.round(totaleGemiddelde);
};

// Vind de drukste en kalmste uren
const vindDruksteEnKalmsteUren = () => {
  const dagelijkseTotalen: Record<string, number[]> = {};

  gegevens.value.forEach(item => {
    const date = item.TimeSlot.split(':')[0];
    dagelijkseTotalen[date] = dagelijkseTotalen[date] || [];
    dagelijkseTotalen[date].push(item.TotalLogins);
  });

  const druksteUren: string[] = [];
  const kalmsteUren: string[] = [];
  let maxGemiddeldeLogins = Number.MIN_SAFE_INTEGER;
  let minGemiddeldeLogins = Number.MAX_SAFE_INTEGER;

  Object.keys(dagelijkseTotalen).forEach(date => {
    const totalLogins = dagelijkseTotalen[date].reduce((acc, curr) => acc + curr, 0);
    const gemiddelde = totalLogins / dagelijkseTotalen[date].length;

    if (gemiddelde > maxGemiddeldeLogins) {
      druksteUren.splice(0, druksteUren.length, date);
      maxGemiddeldeLogins = gemiddelde;
    } else if (gemiddelde === maxGemiddeldeLogins) {
      druksteUren.push(date);
    }

    if (gemiddelde < minGemiddeldeLogins) {
      kalmsteUren.splice(0, kalmsteUren.length, date);
      minGemiddeldeLogins = gemiddelde;
    } else if (gemiddelde === minGemiddeldeLogins) {
      kalmsteUren.push(date);
    }
  });

  return { druksteUren: druksteUren.sort().join(", "), kalmsteUren: kalmsteUren.sort().join(", ") };
};

const gemiddeldLogin = computed(() => berekenGemiddeldLoginPerUur());

const druksteUur = computed(() => {
  const { druksteUren } = vindDruksteEnKalmsteUren();
  return druksteUren;
});

const kalmsteUur = computed(() => {
  const { kalmsteUren } = vindDruksteEnKalmsteUren();
  return kalmsteUren;
});

</script> 
  
<style scoped>
/* Stijlen voor de datumlabel */
.datepicker-label {
  font-size: 20px; 
}

/* Stijlen voor de container van de bovenste items */
.top-items-container {
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  width: auto; 
}

/* Stijlen voor de bovenste items */
.top-items {
  display: flex; 
  justify-content: center; 
  max-width: 1000px; 
  width: 60%; 
}

/* Media query voor schermen kleiner dan 600px breed */
@media (max-width: 600px) {
  .datepicker-label {
    font-size: 16px; 
}
}

@media (max-width: 820px) {
  .top-items {
    width: 80%; 
  }
}
@media (max-width: 600px) {
  .top-items {
    width: 90%;
    font-size: 12px; 
  }
}

/* Stijlen voor de container van de onderste items */
.bottom-items-container {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  width: auto; 
}

/* Stijlen voor de onderste items */
.bottom-items {
  display: flex; 
  justify-content: center; 
  max-width: 1000px; 
  width: 60%; 
}

/* Media query voor schermen kleiner dan 600px breed */
@media (max-width: 600px) {
  .bottom-items {
    width: 90%;
  }
}

/* Media query voor schermen kleiner dan 400px breed */
@media (max-width: 400px) {
  .bottom-items {
    width: 90%; 
    font-size: 16px; 
  }
}

/* Stijlen voor de grafiekcontainer */
.chart-container {
  display: flex;
  justify-content: center; 
  width: 60%; 
  max-width: 1000px; 
  margin: 0 auto; 
}

/* Stijlen voor het canvas element voor de grafiek */
canvas#mijnGrafiek {  
  width: 100%; 
  height: 25em !important; 
  margin-left: auto; 
  margin-right: auto; 
  max-width: 800px; 
  max-height: 350px;
}

/* Stijlen voor de header */
ion-header {  
  display: flex;
  justify-content: center;
  padding: 1em 2em; 
  border-bottom: 1px solid #170b0b; 
}

/* Stijlen voor het logo */
.about-logo { 
  max-width: 20em;
  margin: 0 auto; 
  display: block; 
  background-color: white; 
}

/* Stijlen voor de weekday knoppen bij hover */
.weekday:hover { 
  color: white; 
  transform: scale(1.05);
}

/* Stijlen voor de geselecteerde weekday knoppen */
.weekday.selected { 
  color: white; 
  transform: scale(1.1);
}

/* Stijlen voor de weekday knoppen */
.weekday {
  border: none;
  background-color: transparent; 
  cursor: pointer; 
  color: black; 
  margin: 0.3rem; 
  @media (max-width: 576px) {
    font-size: 0.8rem; 
  }
}

/* Stijlen voor de legende */
.legend-content {
  display: flex; 
}

/* Stijlen voor de legend */
.legend {
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  text-align: center; 
}

/* Stijlen voor de legend items */
.legend-item {
  display: flex; 
  flex-direction: row; 
  align-items: center; 
}

/* Stijlen voor de legend kleuren */
.legend-color {
  width: 1em;
  height: 1em; 
  border-radius: 50%; 
}

/* Stijlen voor de legend labels */
.legend-label { 
  font-size: 1em; 
  margin-left: 2px; 
}

/* Stijlen voor de legend en het canvas */
.legend, #mijnGrafiek {
  display: flex; 
  justify-content: center; 
  align-items: center; 
}

/* Stijlen voor de "zeer druk" kleur */
.zeer-druk {  
  background-color: rgba(255, 0, 0, 0.8); 
}

/* Stijlen voor de "druk" kleur */
.druk { 
  background-color: rgb(199, 106, 0); 
}

/* Stijlen voor de "rustig" kleur */
.rustig { 
  background-color: rgb(0, 171, 23); 
}

/* Stijlen voor de datetime container */
.datetime-container {
  display: none; 
}

/* Stijlen voor de datepicker */
.datepicker {
  font-weight: bold; 
  font-size: 25px; 
}

/* Stijlen voor het datum icoon */
.dateicon {
  margin-top: 0.2em; 
  font-size: 2.5em;
}

/* Stijlen voor het datum icoon bij hover */
.dateicon:hover {
  transform: scale(1.1); 
  color: rgb(74, 133, 143); 
}

/* Stijlen voor het netwerk select label */
.network-select::part(label) {
  font-weight: bold;
}

/* Stijlen voor het datum label */
.datum-bold {
  font-weight: bold; 
}
</style>

