<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-title> {{ $t('poc.barcodeScannerTitle') }} </ion-title>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <ion-text color="primary">
        <h1>Barcode data</h1>
        <p>{{ barcodeData }}</p>
      </ion-text>
      <ion-text color="danger">
        <h1>Error</h1>
        <p>{{ error }}</p>
      </ion-text>
      <ion-button v-on:click="openScanner()">
        Escanear
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export default {
  name: 'BarcodeScanner',

  data() {
    return {
      error: {},
      barcodeData: {},
      async openScanner() {
        await BarcodeScanner.scan()
          .then((barcodeData) => (this.barcodeData = barcodeData))
          .catch((error) => (this.error = error));
        console.log(this.error);
        console.log(this.barcodeData);
      },
    };
  },
};
</script>
