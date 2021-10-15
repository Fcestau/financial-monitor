<template>
  <ion-menu side="start" menu-id="custom" class="my-custom-menu" content-id="main" color="tertiary">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title class="ion-text-center">MESSIRVEINVERTIR</ion-title>
      </ion-toolbar>
      <ion-avatar style="margin: 0 auto; margin-top: 20px; margin-bottom: 5px;">
         <img src="https://pbs.twimg.com/media/EUCh095XQAIXfbM.jpg">
      </ion-avatar>
      <div class="ion-text-center" style="margin-top: 5px; margin-bottom: 100px; color:white;">
        <ion-label>Rodrigo Mignola</ion-label>
      </div>
    </ion-header>
    <ion-content color="tertiary">
      <ion-list class="ion-list-container">
          <ion-item color="tertiary" href=""><div style="margin: 0 auto;">LISTADO DE CUENTAS</div></ion-item>
          <ion-item color="tertiary" href=""><div style="margin: 0 auto;">CARTERA</div></ion-item>
          <ion-item color="tertiary" href="/chart"><div style="margin: 0 auto;">GRAFICAS</div></ion-item>
          <ion-item color="tertiary" href=""><div style="margin: 0 auto;">HISTORIAL DE OPERACIONES</div></ion-item>
          <ion-item color="tertiary" href="/barcode-scanner"><div style="margin: 0 auto;">ESCANEAR CÓDIGO QR</div></ion-item>
          <ion-item color="tertiary" href=""><div style="margin: 0 auto;">ALERTAS ACTIVADAS</div></ion-item>
      </ion-list>
    </ion-content>
    <div class="ion-text-center" style="margin-top: 80px; margin-bottom: 30px;">
        <ion-button>SALIR</ion-button>
    </div>
  </ion-menu>

  <ion-router-outlet id="main"></ion-router-outlet>
</template>
<style>
.my-custom-menu {
  --width: 350px;
  --background: #3444e4;
  
}

.ion-list-container{
  padding-bottom: 0px;
  padding-top: 0px;
}
</style>

<script>
import { 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonList, 
  IonMenu, 
  IonRouterOutlet,
  IonTitle, 
  IonToolbar,
  menuController,
  IonAvatar
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonContent, 
    IonHeader, 
    IonItem, 
    IonList, 
    IonMenu, 
    IonRouterOutlet,
    IonTitle, 
    IonToolbar
  },
  methods: {
    openFirst() {
      menuController.enable(true, 'first');
      menuController.open('first');
    },
    openEnd() {
      menuController.open('end');
    },
    openCustom() {
      menuController.enable(true, 'custom');
      menuController.open('custom');
    }
  }
});
</script>