<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Info</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="content-wrapper">
        <div class="about-container">
          <section id="about-odisee" class="about-section">
            <img src="/img/Odisee_Logo_Co-hogeschool.png" alt="Odisee Logo" class="about-logo">
            <h2>Over Ons</h2>
            <p>
              Wij zijn zes tweedejaars informatica studenten van Odisee Hogeschool: [namen van de studenten].
              Voor ons project 'Integration Project 2' werken we samen met Axxes, een bekend IT-consultancybedrijf.
              Deze samenwerking geeft ons de kans om onze kennis in praktijk te brengen en mee te werken aan echte
              IT-oplossingen.
            </p>
          </section>
          <section id="about-axxes" class="about-section">
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
      </div>
    </ion-content>
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
  .content-wrapper {
    display: flex;
    justify-content: center;
  }

  .about-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px; 
  }

  .about-section {
    flex-basis: calc(50% - 20px); 
    margin-bottom: 20px;
    text-align: center;
  }

  .about-section p {
    text-align: left; 
    margin: 0 auto; 
  }

  .about-logo {
    width: 250px; 
    height: auto; 
    margin-bottom: 10px;
  }

  h2,
  h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  p {
    font-size: 1em;
    line-height: 1.5;
  }

  ion-footer {
    text-align: center;
    margin-top: 20px;
  }

  /* Media Queries */
  @media only screen and (max-width: 800px) {
    .about-section {
      flex-basis: 100%;
    }
  } 
  </style>
  