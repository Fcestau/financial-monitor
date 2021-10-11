<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Escaner de codigo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-content :fullscreen="true">
        <ion-grid>
          <ion-row>
            <ion-col size="6" :key="photo" v-for="photo in photos">
              <ion-img :src="photo.webviewPath"></ion-img>
            </ion-col>
          </ion-row>
        </ion-grid>
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { camera, trash, close } from 'ionicons/icons';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export default {
  name: 'BarcodeScanner',
  setup() {
    return {
      camera,
      trash,
      close,
    };
  },
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
