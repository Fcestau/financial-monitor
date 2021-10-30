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
        label="operation.accountNameFormLabel"
        type="name"
      ></TheTextInput>
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
  name: 'TheNewAccountFormModal',
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      closeOutline,
      form: {
        name: '',
      },
    };
  },
  methods: {
    ...Vuex.mapActions(['addNewManualAccount']),

    closeModal() {
      modalController.dismiss();
    },
    submitForm() {
      const newManualAccount = {
        value: this.form.name,
        displayName: this.form.name,
      };
      this.addNewManualAccount(newManualAccount);
      modalController.dismiss();
    },
  },
};
</script>
