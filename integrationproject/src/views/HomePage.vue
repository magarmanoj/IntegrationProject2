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
          <ion-title>Ondersteuning voor de Druktebarometer</ion-title>
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
.homeGrid {
  margin-top: 10em;
  display: flex;
  justify-content: space-evenly;
}

#upper {
  background: #f9f9f9;
  border: 1px solid #141313;
  border-radius: 1em;
  padding: 5em;
  width: 50%;
  box-shadow:inset;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

ion-list {
  width: 100%;
}

.about-logo {
  max-width: 20em;
  margin: 0 auto;
  display: block;
  background-color: white;
}
</style>
