<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/tabHome">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="lijsten" href="/tabs/tabTest">
          <ion-icon aria-hidden="true" :icon="listOutline" />
          <ion-label>Barometer</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="info" href="/tabs/tabInfo">
          <ion-icon aria-hidden="true" :icon="desktop" />
          <ion-label>Info</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <ion-footer>
        <ion-toolbar>
          <ion-title>&copy; 2024 Team Odisee</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-tabs>
  </ion-page>
</template>

  
  <script lang="ts">
  import { IonPage, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, IonFooter, IonToolbar, IonTitle } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { desktop, listOutline, home } from 'ionicons/icons';
  
  export default defineComponent({
    components: {
      IonPage,
      IonRouterOutlet,
      IonTabs,
      IonTabBar,
      IonTabButton,
      IonLabel,
      IonIcon,
      IonFooter,
      IonToolbar,
      IonTitle
    },
    data() {
      return {
        home: home,
        desktop: desktop,
        listOutline: listOutline
      };
    }
  });
  </script>
  
<style>
  ion-footer {
    text-align: center;
  }

  ion-title{
    height: 1em;
    font-size: 0.8em;
  }
</style>