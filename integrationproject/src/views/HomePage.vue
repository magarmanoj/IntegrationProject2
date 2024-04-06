<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title class="ion-text-center">Home</ion-title>
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
          </ion-row>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-button class="homeBtn" expand="full" href="/tabs/tabTest">
                <ion-icon class="homeIcon" :icon="listOutline"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-button class="homeBtn" expand="full" href="/tabs/tabInfo">
                <ion-icon class="homeIcon" :icon="informationCircle"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue';
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
      IonIcon
    },
    data() {
      return {
        desktop: home,
        listOutline: listOutline,
        informationCircle: information
      };
    }
  });
  </script>
  
  <style scoped>
  .homeIcon {
    font-size: 5em;
  }
  
  .homeBtn {
    margin: 20px auto;
  }
  
  .homeContent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; 
  }
  
  .homeGrid {
    max-width: 800px;
    width: 100%;
  }
  ion-content {
  --ion-background-color: #e3d0d0;
}
  </style>
  