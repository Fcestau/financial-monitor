<template>
  <ion-content>
    <ion-menu :side="side" menu-id="first" content-id="main">
      <ion-header>
        <ion-toolbar :color="color">
          <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item href="/barcode-scanner">PoC Barcode Scanner</ion-item>
          <ion-item href="/chart">PoC Chart.js</ion-item>
          <ion-item href="/external-account">Listado de Cuentas</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main"></ion-router-outlet>
  </ion-content>
</template>
<style>
.my-custom-menu {
  --width: 500px;
}
</style>

<script>
import { menuController } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['side', 'title', 'color'],

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
    },
  },
});
</script>
