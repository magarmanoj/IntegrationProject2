<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
        </ion-toolbar>
      </ion-header>
  
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
  .about-logo {
    max-width: 20em;
    margin: 0 auto;
    display: block;
    background-color: white;
  }
  
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  #upper {
    text-align: center;
    margin-top: 5em;
    font-size:large
  }
  
  #lower {
    text-align: center;
    width: 100%;
    margin-top: 5em;
  }

  
  </style>