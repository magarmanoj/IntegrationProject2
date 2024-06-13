<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Logo van Axxes -->
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="top-items">
          <ion-item class="top-item">
            <!-- Maand selecteren -->
            <ion-select label="Selecteer Maand:" v-model="geselecteerdeMaand" @ionChange="bijMaandWijzigen">
              <!-- Opties voor maanden -->
              <ion-select-option v-for="maand in maanden" :key="maand.value" :value="maand.value">
                {{ maand.text }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </div>
        <div class="chart-container">
          <!-- Container voor de grafiek -->
          <canvas id="mijnGrafiek" ref="grafiekCanvas"></canvas>
        </div>
        <div class="button-container">
          <!-- Terugknop -->
          <ion-button @click="gaTerug" expand="block" class="ga-terug-knop">Ga Terug</ion-button>
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

// Registreer Chart.js componenten
Chart.register(...registerables);

// Referenties naar HTML elementen en data
const grafiekCanvas = ref<HTMLCanvasElement | null>(null);
const grafiekInstance = ref<Chart | null>(null);
const gegevens = ref<any[]>([]);
const geselecteerdeMaand = ref<number>(2); // Standaard naar februari

// Maanden opties
const maanden = [
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

// Router om te navigeren
const router = useRouter();

// Functie om de grafiek te maken
const maakGrafiek = () => {
  if (!grafiekCanvas.value) return;

  const ctx = grafiekCanvas.value.getContext('2d');
  if (!ctx) return;

  if (grafiekInstance.value) {
    grafiekInstance.value.destroy();
  }

  // Verwerk gegevens om labels en waarden te extraheren
  const labels = gegevens.value.map(item => item.Locatie);
  const values = gegevens.value.map(item => item.TotalLogins);

  grafiekInstance.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Totale Logins',
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

// Functie om de lettergrootte van de grafiek aan te passen
const updateGrafiekLetterGrootte = () => {
  if (grafiekInstance.value) {
    const isKleinScherm = window.innerWidth < 600;
    grafiekInstance.value.options.scales.x.ticks.font.size = isKleinScherm ? 8 : 12;
    grafiekInstance.value.options.plugins.legend.labels.font.size = isKleinScherm ? 8 : 12;
    grafiekInstance.value.update();
  }
};

// Functie om gegevens op te halen voor een specifieke maand
const haalDetailsOp = (maand: number) => {
  const postData = {
    month: maand
  };
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/GetByMonths.php', postData)
    .then(response => {
      if (response.status === 200 && response.data.data) {
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

// Functie die wordt aangeroepen bij maandwijziging
const bijMaandWijzigen = () => {
  haalDetailsOp(geselecteerdeMaand.value);
};

// Functie om terug te navigeren
const gaTerug = () => {
  router.push('/tabs/tabTest');
};

// Bij het laden van de component
onMounted(() => {
  haalDetailsOp(geselecteerdeMaand.value);
  window.addEventListener('resize', updateGrafiekLetterGrootte);
});

// Kijk naar veranderingen in geselecteerde maand
watch(() => geselecteerdeMaand.value, () => {
  haalDetailsOp(geselecteerdeMaand.value);
});

// Verwijder event listener bij demontage
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateGrafiekLetterGrootte);
});
</script>

<style scoped>
/* Stijl voor het logo */
.about-logo {
  width: 150px; 
  margin: auto; 
}

/* Stijl voor ion-item componenten */
ion-item {
  font-size: 20px; 
}

/* Stijl voor de container */
.container {
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  width: 100%; 
}

/* Stijl voor de bovenste en onderste items */
.top-items, .bottom-items {
  width: 80%; 
  max-width: 1200px; 
}

/* Stijl voor de grafiekcontainer */
.chart-container {
  display: flex; 
  justify-content: center; 
  width: 80%; 
  max-width: 1200px; 
  margin: 2em 0; 
  height: 30em; 
}

/* Stijl voor het canvas element voor de grafiek */
canvas#mijnGrafiek {
  width: 100%; 
  height: 100% !important; 
}

/* Stijl voor individuele bovenste en onderste items */
.top-item, .bottom-item {
  width: 100%; 
}

/* Stijl voor de knoppencontainer */
.button-container {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 100%; 
  width: 100%; 
}

/* Stijl voor de "ga terug" knop */
.ga-terug-knop {
  width: 200px; 
  height: 50px; 
  font-size: 18px; 
  align-self: center; 
}

/* Media query voor schermen kleiner dan 820px breed */
@media (max-width: 820px) {
  .top-items, .bottom-items, .chart-container {
    width: 90%; 
  }
}

/* Media query voor schermen kleiner dan 600px breed */
@media (max-width: 600px) {
  .top-items, .bottom-items, .chart-container {
    width: 100%; 
    font-size: 16px; 
  }
}
</style>

