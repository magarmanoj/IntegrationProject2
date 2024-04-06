<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="test">
      <div class="showChart">
      <ion-item class="filter">
        <ion-select label="Filter By:" v-model="selectedFilter">
          <ion-select-option value="alphabetical">Alphabetical</ion-select-option>
          <ion-select-option value="total_number">Total Number</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item class="months">
          <ion-select label="Months: " v-model="selectedMonth">
            <ion-select-option value="January">January</ion-select-option>
            <ion-select-option value="February">February</ion-select-option>
            <ion-select-option value="March">March</ion-select-option>
            <ion-select-option value="April">April</ion-select-option>
            <ion-select-option value="May">May</ion-select-option>
            <ion-select-option value="June">June</ion-select-option>
            <ion-select-option value="July">July</ion-select-option>
            <ion-select-option value="August">August</ion-select-option>
            <ion-select-option value="September">September</ion-select-option>
            <ion-select-option value="October">October</ion-select-option>
            <ion-select-option value="November">November</ion-select-option>
            <ion-select-option value="December">December</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item class="days">
          <ion-select label="Days: " v-model="selectedDay">
            <ion-select-option value="Sunday">Sunday</ion-select-option>
            <ion-select-option value="Monday">Monday</ion-select-option>
            <ion-select-option value="Tuesday">Tuesday</ion-select-option>
            <ion-select-option value="Wednesday">Wednesday</ion-select-option>
            <ion-select-option value="Thursday">Thursday</ion-select-option>
            <ion-select-option value="Friday">Friday</ion-select-option>
            <ion-select-option value="Saturday">Saturday</ion-select-option>
          </ion-select>
        </ion-item>    
    </div>
    <div>
        <ion-item>
          <div style="height: 42em; width: 120em;">
        <canvas id="myChart"></canvas>
      </div>
        </ion-item>
      </div>
    </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonToolbar, IonPage, IonItem, IonSelectOption, IonSelect, IonImg } from '@ionic/vue';
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
const selectedMonth = ref<string>("January");
const selectedDay = ref<string>("Sunday");

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

/*
const getFilters = () => {
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/Filter.php')
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }

      if (!response.data.data) {
        console.log('response.data.data is not ok');
        return;
      }
      console.log(response.data.data);
      data.value = response.data.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};*/

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
  // getFilters();
});

watch(filterData, () => {
  createChart();
});

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
