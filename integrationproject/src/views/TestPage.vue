<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Datum:</ion-label>
        <ion-text>{{ currentDate }}</ion-text>
      </ion-item>

      <ion-item>
        <ion-select label="Kies Netwerken:" v-model="selectedNetwork" @ionChange="getNetwerken">
          <ion-select-option v-for="network in alleNetwerken" :key="network" :value="network">{{ network }}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
          <ion-button class="weekday" v-for="(day, index) in weekdays" :key="index" :class="{ 'selected': selectedDay == index }" @click="selectDay(index)">{{ day }}</ion-button>
      </ion-item>
      <!-- Legend for color code -->
      <div class="legend">
        <div class="legend-item">
          <div class="legend-color" style="background-color: rgba(255, 0, 0, 0.8);"></div>
          <div class="legend-label">Zeer druk</div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color:rgba(255, 135, 0, 0.8) ;"></div>
          <div class="legend-label">Druk</div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: rgba(0, 255, 35, 0.8);"></div>
          <div class="legend-label">Rustig</div>
        </div>
      </div>
         
      <!-- Canvas for chart -->
      <canvas id="myChart" ref="chartCanvas"></canvas>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonToolbar, IonLabel , IonPage, IonItem, IonText, IonSelect, IonSelectOption, IonImg, IonButton } from '@ionic/vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface NetworkData {
  name: string;
  capacity: number;
}

interface Data {
  TimeSlot: string;
  Locatie: string;
  TotalLogins: number;
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const selectedDay = ref<number>(0);

const selectDay = (index: any) => {
  selectedDay.value = index;
  onDayChange();
};


const onDayChange = () => {
  getDetails(selectedNetwork.value, selectedDay.value);
};

const alleNetwerken = ['Guest Axxes - AT Recruitm','Entrepot 9', 'airtame', 'Guest Axxes', 'Staff - Axxes', 'Training Axxes', 'Labo' ];

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const currentDate = ref<string>(formatDate(new Date()));

const networkData: Record<string, NetworkData> = {
  'Guest Axxes - AT Recruitm': { name: 'Guest Axxes - AT Recruitm', capacity: 80 },
  'Entrepot 9': { name: 'Entrepot 9', capacity: 5 },
  'airtame': { name: 'airtame', capacity: 5 },
  'Guest Axxes': { name: 'Guest Axxes', capacity: 5 },
  'Staff - Axxes': { name: 'Staff - Axxes', capacity: 35 },
  'Training Axxes': { name: 'Training Axxes', capacity: 10 },
  'Labo': { name: 'Labo', capacity: 5 },
};

const data = ref<Data[]>([]);
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const selectedNetwork = ref<string>(alleNetwerken[0]);

const getCurrentDayOfWeek = (): number => {
  const currentDate = new Date();
  return currentDate.getDay();
};

const getNetwerken = () => {
  const currentSelectedDay = selectedDay.value;
  getDetails(selectedNetwork.value, currentSelectedDay);
};

const getDetails = (locatie: string, day: number) => {
  const postData = {
    locatie: locatie,
    day: day
  };
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePerLocation.php', postData)
    .then(response => {
      console.log(response.data);
      if (response.status == 200 && response.data.data) {
        data.value = response.data.data;
        createChart(); 
      } else {
        console.error('Response not OK:', response);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

onMounted(() => {
  selectedDay.value = getCurrentDayOfWeek();
  getNetwerken();
});

const createChart = () => {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  if (!ctx) return;
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }

  ctx.width = 50;
  ctx.height = 20; 

  console.log("Creating chart with data:", data.value);

  const labels = data.value.map(item => {
  const dateTime = item.TimeSlot;
  return dateTime
  });

  const values = data.value.map(item => item.TotalLogins);
  const backgroundColors = Array(values.length).fill('rgb(74, 133, 143)'); // Light blue for all initial colors
  const hoverBackgroundColors = values.map((value) => {
    const networkCapacity = networkData[selectedNetwork.value].capacity;
    const occupancyPercentage = (value / networkCapacity) * 100;

    if (occupancyPercentage >= 65) {
      return 'rgba(255, 0, 0, 0.8)'; // Very Busy
    } else if (occupancyPercentage < 30) {
      return 'rgba(0, 255, 35, 0.8)'; // Quiet
    } else {
      return 'rgba(255, 135, 0, 0.8)'; // Busy
    }
  });

  console.log("Labels:", labels);
  console.log("Values:", values);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Number of Logins',
        data: values,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total Number of Logins'
          }
        },
        x: {
          title: {
            display: true,
            text: 'TimeSlot'
          }
        }
      }
    }
  });
};
</script>


<style scoped>
ion-content {
  display: flex;
  justify-content: center;
  align-items: center; 
}

canvas#myChart {
  max-width: 100%;
  height: auto;
  margin-top: 4em;
}

.legend {
  display: flex;
  justify-content: space-evenly;
  margin-top: 2em;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 1em;
  height: 1em;
  margin-right: 1em;
  border-radius: 50%;
}

.legend-label {
  font-size: 1em;
}

.showChart {
  display: block;
  flex-wrap: wrap;
}

.test {
  display: flex;
  justify-content: start;
}

ion-header {
  display: flex;
  justify-content: center;
  padding: 1em 2em;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1;
}

.about-logo {
  max-width: 20em;
  margin: 0 auto;
  display: block;
  background-color: white;
}

.weekday {
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: black; /* Change the color of button content */
  margin: auto;
}

.weekday.selected {
  color: white;
}
</style>
