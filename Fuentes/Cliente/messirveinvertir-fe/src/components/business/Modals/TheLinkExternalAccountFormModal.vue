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
      form: {
        email: null,
        password: null,
      },
    };
  },
  setup() {
    return {
      closeOutline,
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    submitForm() {
      console.log(this.form);
    },
  },
};
</script>
<style scoped>
.info-text {
  font-size: 12px;
}
</style>
