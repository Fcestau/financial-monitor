<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button size="small" @click="closeModal()">
            <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t(title) }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <TheTextInput
        v-model="form.name"
        label="operation.assetNameFormLabel"
        type="name"
      />
      <TheTextInput
        v-model="form.symbol"
        label="operation.assetSymbolFormLabel"
        type="name"
      />
      <TheSelector
        v-model="form.type"
        label="operation.assetTypeFormLabel"
        interface="action-sheet"
        :values="assetTypesValues"
      />
      <TheTextInput
        v-model="form.usdLastPrice"
        label="operation.usdLastPrice"
        type="number"
      />
      <TheButton
        @click="submitForm()"
        expand="block"
        icon="closeOutline"
        inner-text="confirm"
        class="ion-margin-top"
      ></TheButton>
    </ion-content>
  </ion-page>
</template>

<style>
.info-text {
  font-size: 12px;
}
</style>

<script>
import { modalController } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import Vuex from 'vuex';
export default {
  name: 'TheNewAssetFormModal',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    const assetTypesValues = [
      {
        value: 'Fiat',
        displayName: 'Fiat',
      },
      {
        value: 'Crypto',
        displayName: 'Criptomoneda',
      },
      {
        value: 'Share',
        displayName: 'Acción',
      },
      {
        value: 'PublicTitle',
        displayName: 'Titulo Público',
      },
    ];

    const form = {
      name: '',
      symbol: '',
      type: '',
      usdLastPrice: null,
    };

    return {
      assetTypesValues,
      closeOutline,
      form,
    };
  },
  methods: {
    ...Vuex.mapActions(['addNewAsset']),

    closeModal() {
      modalController.dismiss();
    },
    async submitForm() {
      const newManualAsset = {
        name: this.form.name,
        symbol: this.form.symbol,
        type: this.form.type,
        account_type: 'Manual',
        usd_last_price: this.form.usdLastPrice,
      };
      await this.addNewAsset({ assets: [newManualAsset] });
      modalController.dismiss();
    },
  },
};
</script>
