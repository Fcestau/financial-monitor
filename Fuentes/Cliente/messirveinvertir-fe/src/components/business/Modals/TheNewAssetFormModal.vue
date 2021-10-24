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
      <TheDatepicker :value="form.date" label="operation.assetDateFormLabel" />
      <TheButton
        @click="submitForm(form)"
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
        value: 'fiat',
        displayName: 'Fiat',
      },
      {
        value: 'crypto',
        displayName: 'Criptomoneda',
      },
      {
        value: 'share',
        displayName: 'Acción',
      },
      {
        value: 'publicTitle',
        displayName: 'Titulo Público',
      },
    ];

    const form = {
      name: '',
      symbol: '',
      type: '',
      date: new Date().toISOString(),
    };

    return {
      assetTypesValues,
      closeOutline,
      form,
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    submitForm(form) {
      console.log(form);
    },
  },
};
</script>
