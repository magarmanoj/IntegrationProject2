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

      <!-- Display aggregated data -->
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
import { IonContent, IonHeader, IonCardHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel ,IonCardTitle, IonPage, IonItem, IonText } from '@ionic/vue';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

interface DataItem {
  TimeSlot: string;
  Locatie: string;
  AantalLogin: string;
}

const data = ref<DataItem[]>([]);

const getDetails = (locatie: string, day: number) => {
  const postData = {
    locatie: locatie,
    day: day
  };
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePerLocation.php', postData)
  .then(response => {
    console.log(response.data); // Log to check the data
    if (response.status === 200 && response.data.data) {
      data.value = response.data.data;
      console.log(data.value);
    } else {
      console.error('Response not OK:', response);
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
};

onMounted(() => {
  // const currentDay = new Date().getDate();
  getDetails("airtame", 4);
});

const displayedData = computed(() => {
  const aggregatedMap = new Map<string, { TimeSlot: string; TotalAantalLogin: number }>();
  data.value.forEach((item) => {
    const aantalLogin = parseInt(item.AantalLogin);
    if (!isNaN(aantalLogin)) {
      if (aggregatedMap.has(item.Locatie)) {
        const existing = aggregatedMap.get(item.Locatie)!;
        existing.TotalAantalLogin += aantalLogin;
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

const currentDate = ref<string>(new Date().toLocaleDateString());
</script>

