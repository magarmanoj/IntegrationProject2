<template>  
  <ion-page>  
    <ion-header>  
      <ion-toolbar> 
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>  
      </ion-toolbar>  
    </ion-header> 
    <ion-content class="ion-padding"> 
      <ion-item>  
        <ion-label>Datum:</ion-label> 
        <ion-text>{{ currentDate }}</ion-text>  
      </ion-item> 
      
      <ion-item>  
        <ion-select label="Kies Netwerken:" v-model="selectedNetwork" @ionChange="getNetwerken">  
          <ion-select-option v-for="network in alleNetwerken" :key="network" :value="network">{{ network }}</ion-select-option> 
        </ion-select> 
      </ion-item> 

      <!-- Datepicker -->
      <ion-item>
        <ion-label class="datepicker" position="stacked">Kies Datum!</ion-label>
        <ion-icon @click="toggleDatePciker" class="dateicon" :icon="calendar"></ion-icon>
        <ion-datetime v-if="toggleDatetime" display-format="DD MMM YYYY" v-model="selectedDate" @ionChange="onDateChange"></ion-datetime>
      </ion-item>

      <ion-item>  
          <ion-button class="weekday" v-for="(day, index) in weekdays" :key="index" :class="{ 'selected': selectedDay == index }" @click="selectDay(index)">{{ day }}</ion-button>  
      </ion-item> 
      
      <!-- Legend for color code -->  
      <ion-grid class="legend"> 
        <ion-row class="legend-content">  
          <ion-col size="auto" class="legend-item"> 
            <div class="legend-color zeer-druk"></div>  
            <div class="legend-label">Zeer druk</div> 
          </ion-col>  
          <ion-col size="auto" class="legend-item"> 
            <div class="legend-color druk"></div> 
            <div class="legend-label">Druk</div>  
          </ion-col>  
          <ion-col size="auto" class="legend-item"> 
            <div class="legend-color rustig"></div> 
            <div class="legend-label">Rustig</div>  
          </ion-col>  
        </ion-row>  
        <ion-row>
          <canvas id="myChart" ref="chartCanvas"></canvas>  
        </ion-row>
      </ion-grid>           
    </ion-content>  
  </ion-page> 
</template> 
  
<script setup lang="ts">  
import { IonContent, IonHeader, IonToolbar, IonLabel , IonPage, IonItem, IonText, IonSelect, IonSelectOption, IonImg, IonButton, IonGrid, IonRow,IonCol, IonDatetime, IonIcon } from '@ionic/vue';  
import axios from 'axios';  
import { ref, onMounted, computed } from 'vue'; 
import { Chart, registerables } from 'chart.js';  
import { calendar  } from 'ionicons/icons';

Chart.register(...registerables); 
  
interface NetworkData { 
  name: string; 
  capacity: number; 
} 
  
interface Data {  
  TimeSlot: string; 
  Locatie: string;  
  TotalLogins: number;  
} 

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  
  
const selectedDay = ref<number>(0); 
const selectedDate = ref<string>(new Date().toISOString().slice(0, 10)); // Initialize with current date

const toggleDatetime = ref<boolean>(false);

const toggleDatePciker = () => {
  console.log(toggleDatetime.value);
  toggleDatetime.value = !toggleDatetime.value;
}
  
const selectDay = (index: any) => { 
  selectedDay.value = index;  
  const currentDate = new Date(selectedDate.value);
  currentDate.setDate(currentDate.getDate() + (index - currentDate.getDay()));
  selectedDate.value = currentDate.toISOString().slice(0, 10);
  onDayChange();  
};  
  
const onDateChange = (): Date => {
  const selectedDatePicker = new Date(selectedDate.value);
  const day = selectedDatePicker.getDate();
  const month = selectedDatePicker.getMonth() + 1;
  const year = selectedDatePicker.getFullYear();
  console.log(day, month, year);
  CheckForData(selectedNetwork.value, day, month, year );
  console.log(selectedDatePicker);
  return selectedDatePicker;
};

const CheckForData = (locatie: string, day: number, month: number, year: number) => {
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePicker.php', { locatie, day, month, year })
    .then(response => {
      if (response.status == 200 && response.data.data.length == 0) {
        console.log("geen data dus gemiddelde");
        getDetails(locatie, selectedDay.value);
      } else {
        getDatePciker(locatie, day, month, year);
      }
    })
    .catch(error => {
      console.error('Error checking data availability:', error);
    });
};



  
const onDayChange = () => { 
  getDetails(selectedNetwork.value, selectedDay.value); 
};  
  
const alleNetwerken = ['Guest Axxes - AT Recruitm','Entrepot 9', 'airtame', 'Guest Axxes', 'Staff - Axxes', 'Training Axxes', 'Labo' ]; 
  
const networkData: Record<string, NetworkData> = {  
  'Guest Axxes - AT Recruitm': { name: 'Guest Axxes - AT Recruitm', capacity: 80 }, 
  'Entrepot 9': { name: 'Entrepot 9', capacity: 80 },  
  'airtame': { name: 'airtame', capacity: 80 },  
  'Guest Axxes': { name: 'Guest Axxes', capacity: 80 },  
  'Staff - Axxes': { name: 'Staff - Axxes', capacity: 80 }, 
  'Training Axxes': { name: 'Training Axxes', capacity: 10 }, 
  'Labo': { name: 'Labo', capacity: 80 },  
};  
  
const data = ref<Data[]>([]); 
const chartCanvas = ref<HTMLCanvasElement | null>(null);  
const selectedNetwork = ref<string>(alleNetwerken[0]);  
  
const formatDate = (date: Date): string => {  
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };  
  return date.toLocaleDateString('en-US', options); 
};  
  
const currentDate = ref<string>(formatDate(new Date()));   

const getCurrentDayOfWeek = (): number => { 
  const currentDate = new Date(); 
  return currentDate.getDay();  
};  
  
const getNetwerken = () => {  
  const currentSelectedDay = selectedDay.value; 
  getDetails(selectedNetwork.value, currentSelectedDay);  
};  

const getDatePciker = (locatie: string, day: number, month: number, year: number) => {  
  const postData = {  
    locatie: locatie, 
    day: day,
    month: month,
    year: year
  };  
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePicker.php', postData)  
    .then(response => { 
      console.log(response.data); 
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
  
const getDetails = (locatie: string, day: number) => {  
  const postData = {  
    locatie: locatie, 
    day: day  
  };  
  axios.post('https://www.gauravghimire.be/API_DrukBarometer/datePerLocation.php', postData)  
    .then(response => { 
      console.log(response.data); 
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
  selectedDay.value = getCurrentDayOfWeek();  
  getNetwerken(); 
}); 
  
const currentHour = computed(() => {  
  const now = new Date(); 
  const hour = now.getHours();  
  const isWithinRange = hour >= 8 && hour <= 17;  
  return {  
    hour, 
    isWithinRange 
  };  
}); 
  
const createChart = () => { 
  const ctx = chartCanvas.value;  
  if (!ctx) return; 
  const existingChart = Chart.getChart(ctx);  
  if (existingChart) {  
    existingChart.destroy();  
  } 
  const labels = data.value.map(item => item.TimeSlot); 
  const values = data.value.map(item => item.TotalLogins);  
  
  const backgroundColors: string[] = [];  
  const hoverBackgroundColors: string[] = []; 

  const currentDate = new Date().toISOString().slice(0, 10);
  const barDate = new Date(selectedDate.value).toISOString().slice(0, 10);

  values.forEach((value, index) => {  
    const barHour = parseInt(labels[index].split(':')[0]);  
    const networkCapacity = networkData[selectedNetwork.value].capacity;  
    const occupancyPercentage = (value / networkCapacity) * 100;  

    let color = 'rgb(74, 133, 143)'; 
    // Compare bar date with current date
    if (barDate < currentDate) {
      color = 'rgb(4, 92, 102)'; // Date before current date
    } 
    
    if (barDate > currentDate) {
      color = 'rgb(145, 184, 189)'; // Date after current date
    }

    if(barDate >= currentDate && barHour > currentHour.value.hour){
      color = 'rgb(145, 184, 189)';
    }

     
    if (occupancyPercentage >= 65) {  
      hoverBackgroundColors.push('rgba(255, 0, 0, 0.8)');   
    } else if (occupancyPercentage < 30) {  
      hoverBackgroundColors.push('rgb(0, 171, 23)');  
    } else {  
      hoverBackgroundColors.push('rgb(199, 106, 0)');   
    } 
    
    if (currentHour.value.isWithinRange && currentHour.value.hour == barHour) { 
      color = hoverBackgroundColors[index]; 
    } 
    backgroundColors.push(color); 
  }); 
  
  new Chart(ctx, {  
    type: 'bar',  
    data: { 
      labels: labels, 
      datasets: [{  
        label: 'Total Number of Logins',  
        data: values, 
        backgroundColor: backgroundColors,  
        hoverBackgroundColor: hoverBackgroundColors,  
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
ion-content { 
  display: flex;  
  justify-content: center;  
  align-items: center;  
} 
  
canvas#myChart {  
  max-width: 100% ;  
  height: 45em !important; 
} 

.legend, #myChart {
  display: flex;
  justify-content: center;
  align-items: center;
}

.legend-content{
  display: block;
}
  
ion-header {  
  display: flex;  
  justify-content: center;  
  padding: 1em 2em; 
  border-bottom: 1px solid #170b0b; 
} 
  
.about-logo { 
  max-width: 20em;  
  margin: 0 auto; 
  display: block; 
  background-color: white;  
} 
  
.weekday {  
  border: none; 
  background-color: transparent;  
  cursor: pointer;  
  color: black; /* Change the color of button content */  
  margin: auto; 
} 
  
.weekday:hover{ 
  color: white; 
  transform: scale(1.2);  
} 
  
.weekday.selected { 
  color: white; 
  transform: scale(1.2);  
} 
  
  
.legend-content{  
  justify-content: center;  
} 
.legend { 
  margin-top: 2em;  
} 
  
.legend-item {  
  display: flex;  
  align-items: center;  
} 
  
.legend-color { 
  width: 1.5em; 
  height: 1.5em;  
  margin-right: 1em;  
  border-radius: 50%; 
} 
  
.zeer-druk {  
  background-color: rgba(255, 0, 0, 0.8); 
} 
  
.druk { 
  background-color: rgb(199, 106, 0); 
} 
  
.rustig { 
  background-color: rgb(0, 171, 23);  
} 
  
.legend-label { 
  font-size: 1.2em; 
} 

.datetime-container {
  display: none;
}

.datepicker {
  font-weight: bold;
}

.dateicon {
  margin-top: 0.2em;
  font-size: 2.5em;
}

.dateicon:hover {
  transform: scale(1.2);
  color:rgb(74, 133, 143);
}

</style>  
