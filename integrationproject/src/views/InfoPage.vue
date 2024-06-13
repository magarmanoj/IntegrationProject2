<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Logo van Axxes -->
        <ion-img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" class="about-logo"></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size-md="6" size-lg="5" offset-lg="1" size-xs="12" class="card-column">
            <!-- Kaart voor "Over Ons" -->
            <ion-card class="info-card">
              <div class="card-content">
                <ion-img src="/img/Odisee_Logo_Co-hogeschool.png" alt="Odisee Logo" class="about-logo"></ion-img>
                <ion-card-header>
                  <ion-card-title>Over Ons</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <!-- Informatie over het team -->
                  Wij zijn een groep van zes tweedejaarsstudenten Informatica aan de Odisee Hogeschool,
                  een co-hogeschool die bekend staat om haar praktijkgerichte aanpak en sterke banden met de industrie.
                  Elk van ons brengt een unieke set aan vaardigheden en een frisse blik op technologische oplossingen,
                  gedreven door een gedeelde passie voor innovatie en softwareontwikkeling.
                  <br><br> In het kader van ons tweedejaarsproject "Integratieproject 2", hebben wij de kans gekregen om samen te werken met Axxes,
                  een vooraanstaand IT-consultancybedrijf. Deze samenwerking biedt ons niet alleen een platform om onze theoretische kennis in de praktijk te brengen, 
                  maar stelt ons ook in staat om direct bij te dragen aan echte IT-oplossingen. 
                  Door deze hands-on ervaring kunnen wij onze vaardigheden aanscherpen in een realistische werkomgeving,
                  waarbij wij direct feedback ontvangen van ervaren professionals in het veld.
                  <br><br> Ons doel is om door middel van dit project niet alleen onszelf te ontwikkelen als toekomstige IT-professionals,
                  maar ook om een positieve impact te hebben op de gemeenschap door middel van de technologische oplossingen die wij creëren. 
                  Wij zijn enthousiast over de mogelijkheden die voor ons liggen en zijn toegewijd om het meeste uit deze unieke educatieve ervaring te halen.
                </ion-card-content>
              </div>
            </ion-card>
          </ion-col>
          <ion-col size-md="6" size-lg="5" size-xs="12" class="card-column">
            <!-- Kaart voor "Onze Klant" -->
            <ion-card class="info-card">
              <div class="card-content">
                <ion-img src="/img/og-image.jpg" alt="Axxes Logo" class="about-logo"></ion-img>
                <ion-card-header>
                  <ion-card-title>Onze Klant</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <!-- Informatie over het project voor Axxes -->
                  Bij ons project voor Axxes,
                  hebben we een geavanceerde tool ontwikkeld die real-time inzicht geeft in de drukte op kantoorlocaties.
                  Deze tool stelt medewerkers in staat om op een intelligente manier te plannen wanneer ze het best naar kantoor kunnen komen,
                  niet alleen op basis van aanwezigheid, maar ook rekening houdend met geplande vergaderingen en andere kantooractiviteiten.
                  Deze tool maakt gebruik van geavanceerde data-analyse om patronen te identificeren in kantoorgebruik,
                  en gebruikt deze informatie om voorspellingen te doen over de verwachte drukte.
                  Dit stelt medewerkers in staat om hun werkdag effectief te plannen,
                  waardoor piekuren op kantoor worden vermeden en een evenwichtiger gebruik van de kantoorruimte wordt bevorderd. <br><br> 
                  Onze software is ontworpen met de nadruk op beveiliging en privacy,
                  waarbij we ervoor zorgen dat alle verzamelde gegevens veilig worden opgeslagen en verwerkt.
                  Daarnaast is de tool geoptimaliseerd voor gebruik op een breed scala aan apparaten,
                  van desktopcomputers tot smartphones en tablets, waardoor hij toegankelijk is voor iedereen binnen het bedrijf, ongeacht hun voorkeursapparaat. <br><br>
                  We streven ernaar de kosten voor implementatie en onderhoud laag te houden,
                  terwijl we de gebruiksvriendelijkheid en toegankelijkheid maximaliseren.
                  Door voortdurend feedback te verzamelen van eindgebruikers, zorgen we ervoor dat onze tool niet alleen voldoet aan de huidige behoeften van Axxes,
                  maar ook flexibel genoeg is om zich aan te passen aan toekomstige veranderingen binnen de organisatie.
                </ion-card-content>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonImg, IonCard, IonGrid, IonCol, IonRow, IonContent, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonGrid,
    IonCol,
    IonRow,
    IonImg
  },
  name: 'HomePage'
});
</script>

<style scoped>
/* Stijl voor het logo */
.about-logo {
  max-width: 75%;
  height: auto;
  margin: 0 auto;
}

/* Stijl voor de informatied kaarten */
.info-card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  text-align: center;
}

/* Stijl voor de kaarten */
ion-card {
  border-radius: 1em; 
}

/* Stijl voor de inhoud van de kaarten */
.card-content {
  border: 1px solid #141313;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.card-content, .card-content ion-card-title {
  font-size: 25px; /* Pas de lettergrootte aan indien nodig */
}

/* Stijl voor de kolommen die de kaarten bevatten */
.card-column {
  display: flex;
  align-items: stretch;
  min-width: 250px;
}

/* Stijl voor de header */
ion-header {
  display: flex;
  justify-content: center;
  padding: 1em 2em;
  border-bottom: 1px solid black;
}

/* Algemene stijl voor het logo */
.about-logo {
  max-width: 20em;
  margin: 0 auto;
  display: block;
  background-color: white;
}
</style>
