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
      <Form @submit="onSubmit">
        <Field name="name" v-slot="{ field }" :rules="isRequired">
          <TheTextInput
            v-bind="field"
            label="operation.assetNameFormLabel"
            name="name"
          />
        </Field>
        <ErrorMessage class="error" name="name" />
        <Field name="symbol" v-slot="{ field }" :rules="isRequired">
          <TheTextInput
            v-bind="field"
            label="operation.assetSymbolFormLabel"
            name="symbol"
          />
        </Field>
        <ErrorMessage class="error" name="symbol" />
        <Field name="type" v-slot="{ field }" :rules="isRequired">
          <TheSelector
            v-bind="field"
            label="operation.assetTypeFormLabel"
            interface="action-sheet"
            :values="assetTypesValues"
            name="type"
          />
        </Field>
        <ErrorMessage class="error" name="type" />
        <Field name="usdLastPrice" v-slot="{ field }" :rules="isRequired">
          <TheTextInput
            v-bind="field"
            label="operation.usdLastPrice"
            type="number"
            name="usdLastPrice"
          />
        </Field>
        <ErrorMessage class="error" name="type" />
        <TheButton
          expand="block"
          icon="closeOutline"
          type="submit"
          inner-text="confirm"
          class="ion-margin-top"
        />
      </Form>
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
import { Field, Form, ErrorMessage } from 'vee-validate';
import Vuex from 'vuex';
export default {
  name: 'TheNewAssetFormModal',
  components: {
    Field,
    Form,
    ErrorMessage,
  },
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

    return {
      assetTypesValues,
      closeOutline,
    };
  },
  methods: {
    ...Vuex.mapActions(['addNewAsset']),

    closeModal() {
      modalController.dismiss();
    },
    async submitForm(data) {
      const newManualAsset = {
        name: data.name,
        symbol: data.symbol,
        type: data.type,
        account_type: 'Manual',
        usd_last_price: data.usdLastPrice,
      };
      await this.addNewAsset({ assets: [newManualAsset] });
      modalController.dismiss();
    },
    isRequired(value) {
      return value ? true : this.$t('validation.required');
    },
  },
};
</script>
<style scoped>
.error {
  font-size: 12px;
  color: #eb3333;
}
</style>
