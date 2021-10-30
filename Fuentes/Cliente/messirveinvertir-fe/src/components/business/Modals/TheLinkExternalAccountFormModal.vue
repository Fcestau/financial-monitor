<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button size="small" @click="closeModal()">
            <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-row>
        <ion-col size="=12">
          <p class="info-text">{{ $t('external.complete_form') }}</p>
          <TheTextInput
            v-model="form.email"
            label="email"
            type="email"
          ></TheTextInput>
          <TheTextInput
            v-model="form.password"
            label="password"
            type="password"
          ></TheTextInput>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="ion-text-center">
          <TheButton
            @click="submitForm"
            expand="block"
            icon="closeOutline"
            inner-text="confirm"
            class="ion-margin-top"
          ></TheButton>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>
<script>
import { modalController } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import Vuex from 'vuex';

export default {
  name: 'TheLinkExternalAccountFormDialog',
  props: {
    title: {
      type: String,
      default: 'Super Modal',
    },
  },
  data() {
    return {
      closeOutline,
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    ...Vuex.mapActions(['addNewAccount']),
    closeModal() {
      modalController.dismiss();
    },
    submitForm() {
      const newAccount = {
        title: this.title,
        avatar:
          'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
        assetType: 'USD',
        amount: 0,
      };
      this.addNewAccount(newAccount);
    },
  },
};
</script>
<style scoped>
.info-text {
  font-size: 12px;
}
</style>
