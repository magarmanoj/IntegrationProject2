<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="top-items-container">
        <ion-item class="top-items">
          <ion-select label="Select Month:" v-model="selectedMonth" @ionChange="onMonthChange">
            <ion-select-option v-for="month in months" :key="month.value" :value="month.value">
              {{ month.text }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </div>
      <div class="chart-container">
        <canvas id="myChart" ref="chartCanvas"></canvas>
      </div>
      <div class="bottom-items-container">
        <ion-item lines="none">
          <ion-button @click="goBack">Go Back</ion-button>
        </ion-item>
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
  { value: 1, text: 'January' },
  { value: 2, text: 'February' },
  { value: 3, text: 'March' },
  { value: 4, text: 'April' },
  { value: 5, text: 'May' },
  { value: 6, text: 'June' },
  { value: 7, text: 'July' },
  { value: 8, text: 'August' },
  { value: 9, text: 'September' },
  { value: 10, text: 'October' },
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
            display: true,
            font: {
              size: 14
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 14
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14
            }
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

ion-item {
  font-size: 20px;
}

.top-items-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
}

.top-items {
  display: flex;
  justify-content: center;
  max-width: 1000px;
  width: 60%;
}

@media (max-width: 820px) {
  .top-items {
    width: 80%;
  }
}

@media (max-width: 600px) {
  .top-items {
    width: 90%;
    font-size: 16px;
  }
}

.bottom-items-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
}

.bottom-items {
  display: flex;
  justify-content: center;
  max-width: 1000px;
  width: 60%;
}

@media (max-width: 600px) {
  .bottom-items {
    width: 90%;
  }
}

@media (max-width: 400px) {
  .bottom-items {
    width: 90%;
    font-size: 16px;
  }
}

.chart-container {
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 0 1em;
}

canvas#myChart {  
  width: 100%;  
  height: 100%; 
}

.legend, #myChart {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  canvas#myChart {
    height: 20em !important;
  }
}
</style>
