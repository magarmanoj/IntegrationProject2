<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="content-container">
        <ion-item class="top-items">
          <ion-label class="select-label">Selecteer Maand:</ion-label>
          <ion-select class="month-select" v-model="selectedMonth" @ionChange="onMonthChange">
            <ion-select-option v-for="month in months" :key="month.value" :value="month.value">
              {{ month.text }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div class="chart-container">
          <canvas id="myChart" ref="chartCanvas"></canvas>
        </div>
        <div class="button-container">
          <ion-button @click="goBack">Ga Terug</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonToolbar, IonPage, IonItem, IonImg, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const chartInstance = ref<Chart | null>(null);
const data = ref<any[]>([]);
const selectedMonth = ref<number>(2); // Default to February

const months = [
  { value: 1, text: 'Januari' },
  { value: 2, text: 'Februari' },
  { value: 3, text: 'Maart' },
  { value: 4, text: 'April' },
  { value: 5, text: 'Mei' },
  { value: 6, text: 'Juni' },
  { value: 7, text: 'Juli' },
  { value: 8, text: 'Augustus' },
  { value: 9, text: 'September' },
  { value: 10, text: 'Oktober' },
  { value: 11, text: 'November' },
  { value: 12, text: 'December' }
];

const router = useRouter();

const createChart = () => {
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext('2d');
  if (!ctx) return;

  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  // Process data to extract labels and values
  const labels = data.value.map(item => item.Locatie);
  const values = data.value.map(item => item.TotalLogins);

  chartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Logins',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            display: false
          }
        }
      }
    }
  });
};

const getDetails = (month: number) => {
  const postData = {
    month: month
  };
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/GetByMonths.php', postData)
    .then(response => {
      if (response.status === 200 && response.data.data) {
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

const onMonthChange = () => {
  getDetails(selectedMonth.value);
};

const goBack = () => {
  router.push('/tabs/tabTest');
};

onMounted(() => {
  getDetails(selectedMonth.value);
});
</script>

<style scoped>
.about-logo {
  width: 150px;
  margin: auto;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.top-items {
  display: flex;
  justify-content: center;
  max-width: 1000px;
  width: 80%;
  margin: 1rem 0;
}

.select-label {
  font-weight: bold;
}

.month-select {
  width: 100%;
}

.chart-container {
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
}

canvas#myChart {
  width: 100%;
  height: 25em !important;
  max-width: 800px;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
}
</style>
