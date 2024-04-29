<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Drukte Barometer</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-select label="Filter By:" v-model="selectedFilter">
          <ion-select-option value="alphabetical">Alphabetical</ion-select-option>
          <ion-select-option value="total_number">Total Number</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-card v-for="(item, index) in displayedData" :key="index">
    <ion-card-header>
      <ion-card-title>{{ item.Locatie }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-label>Datum: {{ item.TimeSlot }}</ion-label><br>
      <ion-label>Number of Logins: {{ item.TotalAantalLogin }}</ion-label>
    </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonCardHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel ,IonCardTitle, IonPage, IonItem, IonSelectOption, IonSelect } from '@ionic/vue';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

interface DataItem {
  TimeSlot: string;
  Locatie: string;
  AantalLogin: string;
}

const data = ref<DataItem[]>([]);
const selectedFilter = ref<string>("alphabetical"); 

const getDetails = (locatie: string) => {
  const postData = {
    locatie: locatie 
  };
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePerLocation.php', postData)
  .then(response => {
  console.log(response.data); // Log to check the data
  if (response.status === 200 && response.data.data) {
    data.value = response.data.data;
    console.log(data.value); // Log to confirm that data is set
  } else {
    console.error('Response not OK:', response);
  }
})
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

onMounted(() => {
  getDetails("airtame");
});

const displayedData = computed(() => {
  const aggregatedMap = new Map<string, { TimeSlot: string; TotalAantalLogin: number }>();
  data.value.forEach((item) => {
    // Assuming item.AantalLogin is a string from the API that can be converted to a number
    const aantalLogin = parseInt(item.AantalLogin);
    if (!isNaN(aantalLogin)) {
      if (aggregatedMap.has(item.Locatie)) {
        const existing = aggregatedMap.get(item.Locatie)!;
        existing.TotalAantalLogin += aantalLogin;
        // Compare and keep the most recent TimeSlot
        if (item.TimeSlot > existing.TimeSlot) {
          existing.TimeSlot = item.TimeSlot;
        }
      } else {
        aggregatedMap.set(item.Locatie, {
          TimeSlot: item.TimeSlot,
          TotalAantalLogin: aantalLogin
        });
      }
    }
  });
  return Array.from(aggregatedMap, ([Locatie, content]) => ({
    Locatie,
    ...content
  }));
});

</script>
