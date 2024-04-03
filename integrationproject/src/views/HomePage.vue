<template>
  <ion-page>
    <ion-header>
      <header>
        <img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" id="header-logo">
      </header>
    </ion-header>
    <ion-content class="homeContent">
      <main>
        <section id="support">
          <h2>Ondersteuning voor de Druktebarometer</h2>
          <p>Heeft u hulp nodig met onze Druktebarometer of wilt u meer informatie? Wij staan klaar om u te
            ondersteunen. Bekijk onze FAQ, stuur ons een e-mail, of bel ons voor directe hulp.</p>
          <ul>
            <li><router-link to="/faq">FAQ over de Druktebarometer</router-link></li>
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
/* Globale stijlen */
html,
body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  height: 100%;
}

/* Header stijlen */
ion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  background-color: #f1f1f1;
  border-bottom: 2px solid #ddd;
}

/* Logo stijlen */
#header-logo {
  height: 60px;
  max-width: 100%;
}

/* Navigatieknop stijlen */
ion-header button {
  background: none;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
}

/* Hover effect voor navigatieknop */
ion-header button:hover::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: #e76921;
  position: absolute;
  bottom: -10px;
  left: 0;
}

/* Hoofdsectie stijlen */
ion-content {
  min-height: calc(100% - 160px);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

/* Footer stijlen */
ion-footer {
  color: white;
  text-align: center;
  padding: 1em;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 2px solid #ddd;
}

ion-footer ion-title {
  font-size: 0.8em;
}

/* Media query voor tablets */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 1em;
  }

  #logo {
    margin-bottom: 1em;
  }

  nav button {
    font-size: 1em;
    padding: 10px 20px;
  }

  main {
    padding: 1em;
  }
}

/* Media query voor mobiele apparaten */
@media (max-width: 480px) {
  nav button {
    padding: 8px 16px;
    font-size: 0.9em;
  }
}
</style>
