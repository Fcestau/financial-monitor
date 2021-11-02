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
    },
    avatar: {
      type: String,
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
        id: Math.floor(Math.random() * 101),
        type: 'IOL',
        name: this.title,
        createdAt: new Date().toISOString(),
        avatar: this.avatar,
        balance: 0,
        assetType: 'USD',
      };
      this.addNewAccount(newAccount);
      modalController.dismiss();
    },
  },
};
</script>
<style scoped>
.info-text {
  font-size: 12px;
}
</style>
