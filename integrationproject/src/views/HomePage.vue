<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Logo van Axxes -->
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid class="full-height">
        <ion-row class="ion-justify-content-center ion-align-items-center full-height">
          <ion-col size-md="8" size-lg="6" size-xs="12" class="card-column">
            <!-- Hoofd kaart -->
            <ion-card class="home-content">
              <div class="card-content">
                <ion-card-header>
                  <ion-card-title>Ondersteuning voor de Druktebarometer</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p>Heeft u hulp nodig met onze Druktebarometer of wilt u meer informatie? Wij staan klaar om u te ondersteunen. Bekijk onze FAQ, stuur ons een e-mail, of bel ons voor directe hulp.</p>
                </ion-card-content>
                <ion-list>
                  <!-- Link naar de FAQ-pagina -->
                  <a href="/tabs/tabTest" class="router-link">
                    <ion-item>
                      <ion-label>FAQ over de Druktebarometer</ion-label>
                    </ion-item>
                  </a>
                  <!-- E-mail informatie -->
                  <ion-item>
                    <ion-label>E-mail: support@axxesproject.com</ion-label>
                  </ion-item>
                  <!-- Telefoon informatie -->
                  <ion-item>
                      <ion-label>Telefoon: 123-456-7890</ion-label>
                  </ion-item>
                </ion-list>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
// Importeren van benodigde componenten van Ionic Vue
import { IonPage, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCard, IonCardContent, IonCol, IonCardHeader, IonCardTitle, IonList, IonItem, IonImg, IonLabel } from '@ionic/vue';
// Importeren van Vue functies
import { defineComponent } from 'vue';
// Importeren van ionicons
import { home, information, listOutline } from 'ionicons/icons';

// Definiëren van de component
export default defineComponent({
  name: 'TabsPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCol,
    IonGrid,
    IonRow,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonImg
  },
  data() {
    return {
      // Iconen voor navigatie of gebruik
      desktop: home,
      listOutline: listOutline,
      informationCircle: information
    };
  }
})
</script>

<style scoped>
/* Stijlen voor de header */
ion-header {
  display: flex;
  justify-content: center;
  padding: 1em 2em;
  border-bottom: 1px solid black;
}

/* Stijlen voor de content */
ion-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Stijlen voor de lijst */
ion-list {
  width: 100%;
}

/* Stijlen voor de kolom die de kaart bevat */
.card-column {
  display: flex;
  align-items: stretch;
  min-width: 250px;
}

/* Stijlen voor de kaart inhoud */
.home-content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  text-align: center;
}

/* Stijlen voor de tekst en labels binnen de kaart */
.card-content p, .card-content ion-label, .card-content ion-card-title {
  font-size: 25px; /* Pas de lettergrootte aan indien nodig */
}

/* Stijlen voor de kaart content container */
.card-content {
  border: 1px solid #141313;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2em;
}

/* Stijlen voor het logo */
.about-logo {
  max-width: 20em;
  margin: 0 auto;
  display: block;
  background-color: white;
}
</style>
