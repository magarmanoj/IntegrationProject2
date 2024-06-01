<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="top-items">
          <ion-item class="top-item">
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
        <div class="button-container">
          <ion-button @click="goBack" expand="block" class="go-back-button">Go Back</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonToolbar, IonPage, IonItem, IonImg, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
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
      hover: {
        mode: null
      },
      plugins: {
        tooltip: {
          enabled: false
        },
        legend: {
          labels: {
            font: {
              size: window.innerWidth < 600 ? 8 : 12
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: window.innerWidth < 600 ? 8 : 12
            }
          }
        },
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

const updateChartFontSize = () => {
  if (chartInstance.value) {
    const isSmallScreen = window.innerWidth < 600;
    chartInstance.value.options.scales.x.ticks.font.size = isSmallScreen ? 8 : 12;
    chartInstance.value.options.plugins.legend.labels.font.size = isSmallScreen ? 8 : 12;
    chartInstance.value.update();
  }
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
  window.addEventListener('resize', updateChartFontSize);
});

watch(() => selectedMonth.value, () => {
  getDetails(selectedMonth.value);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateChartFontSize);
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

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.top-items, .bottom-items {
  width: 80%;
  max-width: 1200px;
}

.chart-container {
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 1200px;
  margin: 2em 0;
  height: 30em; 
}

canvas#myChart {
  width: 100%;
  height: 100% !important;
}

.top-item, .bottom-item {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%;
}

.go-back-button {
  width: 200px; 
  height: 50px;  
  font-size: 18px; 
  align-self: center;
}

@media (max-width: 820px) {
  .top-items, .bottom-items, .chart-container {
    width: 90%;
  }
}

@media (max-width: 600px) {
  .top-items, .bottom-items, .chart-container {
    width: 100%;
    font-size: 16px;
  }
}
</style>
