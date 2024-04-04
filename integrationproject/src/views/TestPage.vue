<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Drukte Barometer</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="chart">
      <ion-item>
        <ion-select label="Filter By:" v-model="selectedFilter">
          <ion-select-option value="alphabetical">Alphabetical</ion-select-option>
          <ion-select-option value="total_number">Total Number</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <canvas id="myChart" width="650" height="300"></canvas>
      </ion-item>
      <!--
      <ion-card v-for="(item, index) in filterData" :key="index">
        <ion-card-header>
          <ion-card-title>{{ item.Locatie }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-label>Datum: {{ item.Datum }}</ion-label><br>
          <ion-label>Aantal Logins: {{ item.TotalAantalLogin }}</ion-label>
        </ion-card-content>
      </ion-card>
    -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonItem, IonSelectOption, IonSelect } from '@ionic/vue';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';
import { watch } from 'vue';


interface DataItem {
  Datum: string;
  Locatie: string;
  AantalLogin: string;
}

const data = ref<DataItem[]>([]);
const selectedFilter = ref<string>("alphabetical"); 

const getDetails = () => {
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/GetDetails.php')
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }

      if (!response.data.data) {
        console.log('response.data.data is not ok');
        return;
      }

      data.value = response.data.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

const getFilteredData = () => {
  axios.post('https://manojmagar.be/RESTfulAPI/Taak1/api/Medewerkerget.php')
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
      }
      if (!response.data.data) {
        console.log('response.data.data is not ok');
        return;
      }
      selectedFilter.value = response.data.data.map((selectedFilter: any) => ({
        ...selectedFilter
      }));
    })
    .catch(error => {
      console.error('Error fetching Medewerkers:', error);
    });
};


const displayedData = computed(() => {
  const aggregatedMap = new Map<string, { Datum: string; TotalAantalLogin: number }>();
  data.value.forEach((item) => {
    const locatie = item.Locatie;
    const aantalLogin = Number(item.AantalLogin);
    const datum = item.Datum;
    if (!isNaN(aantalLogin)) { 
      if (aggregatedMap.has(locatie)) {
        const currentValue = aggregatedMap.get(locatie)!;
        aggregatedMap.set(locatie, { Datum: datum, TotalAantalLogin: currentValue.TotalAantalLogin + aantalLogin });
      } else {
        aggregatedMap.set(locatie, { Datum: datum, TotalAantalLogin: aantalLogin });
      }
    }
  });
  return Array.from(aggregatedMap).map(([Locatie, { Datum, TotalAantalLogin }]) => ({
    Locatie,
    Datum,
    TotalAantalLogin
  }));
});

const filterData = computed(() => {
  const filteredData = displayedData.value.slice();
  if (selectedFilter.value == "alphabetical") {
    return filteredData.sort((a, b) => a.Locatie.localeCompare(b.Locatie));
  } else if (selectedFilter.value == "total_number") {
    return filteredData.sort((a, b) => b.TotalAantalLogin - a.TotalAantalLogin);
  } else {
    return filteredData; 
  }
});

const createChart = () => {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  if (!ctx) return;
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }

  const x_as = filterData.value.map(item => item.Locatie);
  const y_as = filterData.value.map(item => item.TotalAantalLogin);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x_as, 
      datasets: [{
        label: 'Total Number of Logins',
        data: y_as, 
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
            text: 'Location'
          }
        }
      }
    }
  });
};

onMounted(() => {
  getDetails();
  getFilteredData();
});

watch(filterData, () => {
  createChart();
});

</script>

