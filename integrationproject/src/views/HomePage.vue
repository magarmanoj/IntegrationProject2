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
/* Global Styles */
html, body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff; /* White background for sobriety */
}

/* Header Styles */
ion-header {
  display: flex;
  justify-content: center; /* Center the logo */
  padding: 1em 2em;
  background-color: #fff; /* White background */
  border-bottom: 1px solid #e1e1e1; /* Subtle border for separation */
}

#header-logo {
  height: 60px;
}

/* Main Section Styles */
ion-content.homeContent {
  padding: 20px;
  display: flex;
  justify-content: space-around; /* Distribute space between kaders */
  flex-wrap: wrap; /* Ensure responsiveness */
}

.card {
  background: #f9f9f9; /* Slightly off-white background for the cards */
  border: 1px solid #e1e1e1; /* Subtle border for definition */
  border-radius: 4px; /* Slight rounding of corners */
  padding: 20px;
  margin-top: 20px;
  width: 45%; /* Card width */
  box-shadow: none; /* No shadow for sobriety */
}

/* Text Styles for consistency with the screenshot */
.card h2 {
  color: #333; /* Dark gray color for headings */
  margin-bottom: 0.5em;
}

.card p, .card li {
  color: #666; /* Lighter gray for text */
}

/* Footer Styles */
ion-footer {
  color: #666; /* Lighter gray for text */
  background-color: #fff; /* White background */
  text-align: center;
  padding: 1em;
  border-top: 1px solid #e1e1e1; /* Subtle border for separation */
}

ion-footer ion-title {
  font-size: 0.8em;
}

/* Tablet Media Query */
@media (max-width: 768px) {
  .card {
    width: 100%; /* Full width cards on smaller screens */
    margin-top: 1em;
  }
}

/* Mobile Media Query */
@media (max-width: 480px) {
  .card {
    padding: 1em;
  }
}

</style>
