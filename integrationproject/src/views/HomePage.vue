<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content class="homeContent">
      <div class="homeGrid">
        <section id="upper">
          <ion-title class="title-header">Ondersteuning voor de Druktebarometer</ion-title>
            <ion-text>
               <p>Heeft u hulp nodig met onze Druktebarometer of wilt u meer informatie? Wij staan klaar om u te ondersteunen. Bekijk onze FAQ, stuur ons een e-mail, of bel ons voor directe hulp.</p>
            </ion-text>
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
       </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonList, IonItem, IonImg, IonLabel } from '@ionic/vue';
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
    IonText,
    IonList,
    IonItem,
    IonLabel,
    IonImg
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
ion-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1;
}
.title-header {
  font-size: 2em; /* Standaard grootte */
  text-align: center; /* Centreert de titel */
  word-wrap: break-word; /* Zorgt ervoor dat lange woorden naar de volgende regel gaan indien nodig */
}

.homeGrid {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  margin-top: 1em;
}

#upper {
  border: 1px solid #141313;
  border-radius: 1em;
  padding: 1em;
  width: 100%; /* Volledige breedte op mobiele apparaten */
  max-width: 800px; /* Maximale breedte voor grotere schermen */
  box-shadow: inset;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ion-list {
  width: 100%;
}

.about-logo {
  max-width: 20%; /* Verkleint het logo naar een meer geschikte grootte */
  height: auto;
  margin: 0 auto;
  display: block;
}

/* Media Queries voor verschillende schermformaten */
@media (max-width: 768px) {
  ion-header {
    padding: 0.25em 0.5em;
  }

  #upper {
    padding: 0.5em;
  }
  .about-logo {
    width: 30%; /* Maak het logo groter op middelgrote schermen */
    max-width: 180px; /* Een beetje kleiner maximaal om overbelasting te voorkomen */
  }

  .title-header {
    font-size: 1.5em; /* Kleinere font size op tablets */
  }

  ion-label {
    font-size: 0.9em;
  }
}
@media (max-width: 600px) {
  .title-header {
    font-size: 1.2em; /* Nog kleiner op kleine schermen */
  }
}

@media (max-width: 480px) {
  .about-logo {
    max-width: 40%; /* Verkleint nog verder voor kleinere schermen */
  }

  ion-title {
    font-size: 1.1em; /* Verkleint de titelgrootte op zeer kleine schermen */
  }
  
  ion-label {
    font-size: 0.8em;
  }
  .title-header {
    font-size: 1em; /* Zeer klein op zeer kleine schermen */
  }
}
</style>


