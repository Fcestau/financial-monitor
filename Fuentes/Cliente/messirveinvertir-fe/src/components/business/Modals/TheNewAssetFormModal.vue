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
      <Form @submit="onSubmit" >
        <Field name="name" v-slot={field} :rules="isRequired">
          <TheTextInput
          v-bind="field"
          label="operation.assetNameFormLabel"
          name="name"
          />
        </Field>
        <ErrorMessage class="error" name="name" />
        <Field name="symbol" v-slot={field} :rules="isRequired">
          <TheTextInput
            v-bind="field"
            label="operation.assetSymbolFormLabel"
            name="symbol"
          />
        </Field>
        <ErrorMessage class="error" name="symbol" />
        <Field name="type" v-slot={field} :rules="isRequired">
          <TheSelector
            v-bind="field"
            label="operation.assetTypeFormLabel"
            interface="action-sheet"
            :values="assetTypesValues"
            name="type"
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
import { Field, Form, ErrorMessage  } from 'vee-validate';
import Vuex from 'vuex';
export default {
  name: 'TheNewAssetFormModal',
  components: {
    Field,
    Form,
    ErrorMessage
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
    onSubmit(data) {
      this.addNewAsset(data);
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
  color: #EB3333;
}
</style>
