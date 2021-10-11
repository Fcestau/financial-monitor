<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Escaner de codigo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
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
