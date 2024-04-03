<template>
    <ion-page>
        <ion-header>
            <header>
                <img src="/img/Logo_Axxes+It+consultancy-RGB.png" alt="Axxes Logo" id="header-logo">
            </header>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="content-wrapper">
                <section id="about-odisee">
                    <img src="/img/Odisee_Logo_Co-hogeschool.png" alt="Odisee Logo" class="about-logo">
                    <h2>Over Ons</h2>
                    <p>
                        Wij zijn zes tweedejaars informatica studenten van Odisee Hogeschool: [namen van de studenten].
                        Voor ons project 'Integration Project 2' werken we samen met Axxes, een bekend
                        IT-consultancybedrijf.
                        Deze samenwerking geeft ons de kans om onze kennis in praktijk te brengen en mee te werken aan
                        echte
                        IT-oplossingen.
                    </p>
                </section>
                <section id="about-axxes">
                    <img src="/img/og-image.jpg" alt="Axxes Logo" class="about-logo">
                    <h3>Onze Klant</h3>
                    <p>
                        We ontwikkelen voor Axxes een slimme tool die laat zien hoe druk het op kantoor zal zijn. Deze
                        tool
                        gebruikt informatie zoals geplande vergaderingen om te voorspellen wanneer het kantoor vol of
                        juist
                        rustig is. Zo kan iedereen makkelijk beslissen wanneer het beste is om naar kantoor te komen.
                        We zorgen ervoor dat deze tool veilig en makkelijk in gebruik is, en goed werkt op computers,
                        mobiele
                        telefoons en tablets. We proberen de kosten laag te houden en de gebruiksvriendelijkheid hoog.
                    </p>
                </section>
            </div>
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
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonFooter
    },
    name: 'InfoPage'
});
</script>

<style scoped>
/* Globale stijlen */
html,
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: black;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
}

ion-content {
    --background: white;
}

/* Header stijlen */
ion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f1f1f1;
    border-bottom: 2px solid #ddd;
}

/* Stijlen voor het logo in de header */
#header-logo {
    height: 60px;
}


/* Hoofdsectie stijlen */
ion-content {
    padding: 2rem;
}

.content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
}

/* Gemeenschappelijke stijlen voor de sectie over Odisee en Axxes */
#about-odisee,
#about-axxes {
    flex: 1;
    padding: 1rem;
    border-radius: 10px;
    background: white;
    color: black;
}

.about-logo {
    max-width: 200px;
    height: auto;
    margin-bottom: 1rem;
}

/* Stijlen voor de logo's in de secties over Odisee en Axxes */
#about-odisee h2,
#about-axxes h3 {
    color: #e76921;
    margin-bottom: 1rem;
}

/* Stijlen voor de paragrafen in de secties over Odisee en Axxes */
#about-odisee p,
#about-axxes p {
    font-size: 1rem;
    text-align: left;
    margin-bottom: 1rem;
}

/* Stijlen voor de footer */
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

/* Media query voor Tablet en Telefoon*/
@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column;
    }
}
</style>
