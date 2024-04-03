<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title class="ion-text-center">Info</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div class="content-wrapper">
          <section id="about-odisee">
            <img src="/img/Odisee_Logo_Co-hogeschool.png" alt="Odisee Logo" class="about-logo">
            <h2>Over Ons</h2>
            <p>
              Wij zijn zes tweedejaars informatica studenten van Odisee Hogeschool: [namen van de studenten].
              Voor ons project 'Integration Project 2' werken we samen met Axxes, een bekend IT-consultancybedrijf.
              Deze samenwerking geeft ons de kans om onze kennis in praktijk te brengen en mee te werken aan echte
              IT-oplossingen.
            </p>
          </section>
          <section id="about-axxes">
            <img src="/img/og-image.jpg" alt="Axxes Logo" class="about-logo">
            <h3>Onze Klant</h3>
            <p>
              We ontwikkelen voor Axxes een slimme tool die laat zien hoe druk het op kantoor zal zijn. Deze tool
              gebruikt informatie zoals geplande vergaderingen om te voorspellen wanneer het kantoor vol of juist
              rustig is. Zo kan iedereen makkelijk beslissen wanneer het beste is om naar kantoor te komen.
              We zorgen ervoor dat deze tool veilig en makkelijk in gebruik is, en goed werkt op computers, mobiele
              telefoons en tablets. We proberen de kosten laag te houden en de gebruiksvriendelijkheid hoog.
            </p>
          </section>
        </div>
      </ion-content>
  
      <ion-footer>
        <ion-toolbar>
          <ion-title>&copy; 2024 Team Odisee</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonFooter
    },
    name: 'HomePage'
  });
  </script>
  
  <style scoped>
  /* Scoped styles as provided */
  </style>
  