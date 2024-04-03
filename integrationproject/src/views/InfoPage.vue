<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Info</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size-md="6" size-lg="5" offset-lg="1" size-xs="12" class="card-column">
            <ion-card class="info-card">
              <div class="card-content">
                <img src="/img/Odisee_Logo_Co-hogeschool.png" alt="Odisee Logo" class="about-logo">
                <ion-card-header>
                  <ion-card-title>Over Ons</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Wij zijn zes tweedejaars informatica studenten van Odisee Hogeschool: [namen van de studenten]. Voor
                  ons
                  project 'Integration Project 2' werken we samen met Axxes, een bekend IT-consultancybedrijf. Deze
                  samenwerking geeft ons de kans om onze kennis in praktijk te brengen en mee te werken aan echte
                  IT-oplossingen.
                </ion-card-content>
              </div>
            </ion-card>
          </ion-col>
          <ion-col size-md="6" size-lg="5" size-xs="12" class="card-column">
            <ion-card class="info-card">
              <div class="card-content">
                <img src="/img/og-image.jpg" alt="Axxes Logo" class="about-logo">
                <ion-card-header>
                  <ion-card-title>Onze Klant</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  We ontwikkelen voor Axxes een slimme tool die laat zien hoe druk het op kantoor zal zijn. Deze tool
                  gebruikt informatie zoals geplande vergaderingen om te voorspellen wanneer het kantoor vol of juist
                  rustig is. Zo kan iedereen makkelijk beslissen wanneer het beste is om naar kantoor te komen. We
                  zorgen
                  ervoor dat deze tool veilig en makkelijk in gebruik is, en goed werkt op computers, mobiele telefoons
                  en
                  tablets. We proberen de kosten laag te houden en de gebruiksvriendelijkheid hoog.
                </ion-card-content>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonCard, IonGrid, IonCol, IonRow, IonContent, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonGrid,
    IonCol,
    IonRow
  },
  name: 'HomePage'
});
</script>

<style scoped>
.about-logo {
  max-width: 75%;
  height: auto;
  margin: 0 auto;
}

.info-card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  text-align: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card-column {
    display: flex;
    align-items: stretch;
  }

</style>