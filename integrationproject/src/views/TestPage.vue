<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Drukte Barometer</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Date:</ion-label>
        <ion-text>{{ currentDate }}</ion-text>
      </ion-item>

      <ion-item>
        <ion-select label="Select Network" v-model="selectedNetwork" @ionChange="getNetwerken">
          <ion-select-option v-for="network in alleNetwerken" :key="network" :value="network">{{ network }}</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- Canvas for chart -->
      <canvas id="myChart" ref="chartCanvas"></canvas>
    </ion-content>
  </ion-page>
</template>



<script setup lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel , IonPage, IonItem, IonText, IonSelect, IonSelectOption } from '@ionic/vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


interface DataItem {
  TimeSlot: string;
  Locatie: string;
  TotalLogins: number;
}

const alleNetwerken = ['Guest Axxes - AT Recruitm','Entrepot 9', 'airtame', 'Guest Axxes', 'Staff - Axxes', 'Training Axxes', 'Labo' ];


const data = ref<DataItem[]>([]);
const currentDate = ref<string>(new Date().toLocaleDateString());
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const selectedNetwork = ref<string>(alleNetwerken[0]);


const getCurrentDayOfWeek = (): number => {
  const currentDate = new Date();
  return currentDate.getDay();
};

const getNetwerken = () => {
  const day = getCurrentDayOfWeek();
  console.log(day);
  getDetails(selectedNetwork.value, day);
};

const getDetails = (locatie: string, day: number) => {
  const postData = {
    locatie: locatie,
    day: day
  };
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePerLocation.php', postData)
    .then(response => {
      console.log(response.data); // Log to check the data
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
  getNetwerken();
});

const createChart = () => {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  if (!ctx) return;
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }

  console.log("Creating chart with data:", data.value);

  // Using TimeSlot as x-axis labels and TotalLogins as the values
  const labels = data.value.map(item => item.TimeSlot);
  const values = data.value.map(item => item.TotalLogins);

  console.log("Labels:", labels);
  console.log("Values:", values);
  // Creating the chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Number of Logins',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
.showChart {
  display: block;
  flex-wrap: wrap;
}

ion-select {
  padding: 3em;
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
</style>
