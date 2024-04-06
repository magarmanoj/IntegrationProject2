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
          <table class="info-table">
            <tr>
              <th colspan="2">Over Ons</th>
            </tr>
            <tr>
              <td>
                <img src="/img/Odisee_Logo_Co-hogeschool.png" alt="Odisee Logo" class="about-logo">
              </td>
              <td>
                <p>
                  Wij zijn zes tweedejaars informatica studenten van Odisee Hogeschool: [namen van de studenten].
                  Voor ons project 'Integration Project 2' werken we samen met Axxes, een bekend IT-consultancybedrijf.
                  Deze samenwerking geeft ons de kans om onze kennis in praktijk te brengen en mee te werken aan echte
                  IT-oplossingen.
                </p>
              </td>
            </tr>
            <tr>
              <th colspan="2">Onze Klant</th>
            </tr>
            <tr>
              <td>
                <img src="/img/og-image.jpg" alt="Axxes Logo" class="about-logo">
              </td>
              <td>
                <p>
                  We ontwikkelen voor Axxes een slimme tool die laat zien hoe druk het op kantoor zal zijn. Deze tool
                  gebruikt informatie zoals geplande vergaderingen om te voorspellen wanneer het kantoor vol of juist
                  rustig is. Zo kan iedereen makkelijk beslissen wanneer het beste is om naar kantoor te komen.
                  We zorgen ervoor dat deze tool veilig en makkelijk in gebruik is, en goed werkt op computers, mobiele
                  telefoons en tablets. We proberen de kosten laag te houden en de gebruiksvriendelijkheid hoog.
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-title>&copy; 2024 Team Odisee</ion-title>
      </ion-toolbar>
    </ion-footer>
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
  background-color: #f7efef;
}

.about-container {
  max-width: 1200px;
}

.about-logo {
  
  height: auto;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
}

.info-table th {
  text-align: center;
  font-size: 1.5em;
}

.info-table td {
  vertical-align: top;
  padding: 20px;
  text-align: left;
  font-size: 1em;
}

ion-footer {
  text-align: center;
  margin-top: 20px;
}
</style>
