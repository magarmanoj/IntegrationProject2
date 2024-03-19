<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Card Details</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card v-for="(item, index) in displayedData" :key="index">
          <ion-card-header>
            <ion-card-title>{{ item.Datum }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-label>Location: {{ item.Locatie }}</ion-label><br>
          <ion-label >Number of Logins: {{ item.AantalLogin }}</ion-label>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>

<script setup lang="ts">
import { IonContent, IonHeader, IonCardHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel ,IonCardTitle, IonPage } from '@ionic/vue';
import axios from 'axios';
import { ref, onMounted, } from 'vue';
interface DataItem {
  Datum: string;
  Locatie: string;
  AantalLogin: string;
}
const data = ref<DataItem[]>([]);
const displayedData = ref<DataItem[]>([]);
onMounted(() => {
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
      displayedData.value = data.value.slice(0, 20);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
</script>