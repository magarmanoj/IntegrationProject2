<template>
  <ion-page>
    <ion-header>
      <header>
        <img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" id="header-logo">
      </header>
    </ion-header>
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
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonTitle, IonContent, IonFooter } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonFooter
  }
})
</script>

<style scoped>
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
