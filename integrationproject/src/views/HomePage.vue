<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="6" size-lg="5" offset-lg="1" size-xs="12" class="card-column">
            <ion-card class="home-content">
              <div class="card-content">
                <ion-card-header>
                  <ion-card-title>Ondersteuning voor de Druktebarometer</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p>Heeft u hulp nodig met onze Druktebarometer of wilt u meer informatie? Wij staan klaar om u te ondersteunen. Bekijk onze FAQ, stuur ons een e-mail, of bel ons voor directe hulp.</p>
                </ion-card-content>
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
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCard, IonCardContent, IonCol, IonCardHeader, IonCardTitle, IonList, IonItem, IonImg, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import { home, information, listOutline } from 'ionicons/icons';

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
  padding: 1em 2em;
  border-bottom: 1px solid black;
}

ion-list {
  width: 100%;
}


.card-column {
  display: flex;
  align-items: stretch;
  min-width: 250px;
}

.home-content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  text-align: center;
}

.card-content {
  border: 1px solid #141313;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.about-logo {
  max-width: 20em;
  margin: 0 auto;
  display: block;
  background-color: white;
}

</style>
