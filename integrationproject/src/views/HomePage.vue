<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>
<<<<<<< Updated upstream
    <ion-content class="homeContent">
      <main>
        <section id="support" class="card">
          <h2>Ondersteuning voor de Druktebarometer</h2>
          <p>Heeft u hulp nodig met onze Druktebarometer of wilt u meer informatie? Wij staan klaar om u te
            ondersteunen. Bekijk onze FAQ, stuur ons een e-mail, of bel ons voor directe hulp.</p>
          <ul>
            <li><a href="/tabs/tabTest">FAQ over de Druktebarometer</a></li>
            <li>E-mail: support@axxesproject.com</li>
            <li>Telefoon: 123-456-7890</li>
          </ul>
        </section>
      </main>
    </ion-content>


    <ion-footer>
      <ion-title>&copy; 2024 Team Odisee</ion-title>
    </ion-footer>
=======

    <ion-content class="homeContent">
      <ion-grid class="homeGrid">
        <ion-row>
          <ion-col class="ion-text-center">
            <ion-button class="homeBtn" expand="full" href="/tabs/tabHome">
              <ion-icon class="homeIcon" :icon="desktop"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col class="ion-text-center">
            <ion-button class="homeBtn" expand="full" href="/tabs/tabTest">
              <ion-icon class="homeIcon" :icon="listOutline"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col class="ion-text-center">
            <ion-button class="homeBtn" expand="full" href="/tabs/tabInfo">
              <ion-icon class="homeIcon" :icon="informationCircle"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-text-center">
            <main>
              <section id="upper">
                <ion-title>Ondersteuning voor de Druktebarometer</ion-title>
                <ion-text>
                  <p>Heeft u hulp nodig met onze Druktebarometer of wilt u meer informatie? Wij staan klaar om u te ondersteunen. Bekijk onze FAQ, stuur ons een e-mail, of bel ons voor directe hulp.</p>
                </ion-text>
              </section>
              <section id="lower">
                <ion-list>
                  <a href="/tabs/tabTest" class="router-link">
                  <ion-item>
                    <ion-label>FAQ over de Druktebarometer</ion-label>
                  </ion-item>
                  </a>
                  <ion-item>
                    <ion-label>E-mail: support@axxesproject.com</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label>Telefoon: 123-456-7890</ion-label>
                  </ion-item>
                </ion-list>
              </section>
            </main>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
>>>>>>> Stashed changes
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText, IonList, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';
import { home, information, listOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonText,
    IonList,
    IonItem,
  },
  data() {
    return {
      desktop: home,
      listOutline: listOutline,
      informationCircle: information
    };
  }
})
</script>


<style scoped>
<<<<<<< Updated upstream
/* Globale Stijlen */
html, body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff; 
}

/* Stijlen voor de Header */
ion-header {
  display: flex;
  justify-content: center; 
  padding: 1em 2em;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1; 
}

#header-logo {
  height: 60px;
}

/* Stijlen voor de Hoofdsectie */
ion-content.homeContent {
  padding: 20px;
  display: flex;
  justify-content: space-around; 
  flex-wrap: wrap; 
}

.card {
  background: #f9f9f9; 
  border: 1px solid #e1e1e1; 
  border-radius: 4px; 
  padding: 20px;
  margin-top: 20px;
  width: 45%; 
  box-shadow: none;
}

.card h2 {
  color: #333; 
  margin-bottom: 0.5em;
}

.card p, .card li {
  color: #666; 
}

/* Stijlen voor de Footer */
ion-footer {
  color: #666; 
  background-color: #fff; 
  text-align: center;
  padding: 1em;
  border-top: 1px solid #e1e1e1; 
}

ion-footer ion-title {
  font-size: 0.8em;
}

/* Media Query voor Tablets */
@media (max-width: 768px) {
  .card {
    width: 100%; 
    margin-top: 1em;
  }
}

/* Media Query voor Mobiele Apparaten */
@media (max-width: 480px) {
  .card {
    padding: 1em;
  }
}


</style>
=======

</style>
>>>>>>> Stashed changes
