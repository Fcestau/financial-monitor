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
      <Form @submit="onSubmit" >
        <ion-row>
          <ion-col size="=12">
            <p class="info-text">{{ $t('external.complete_form') }}</p>
            <Field name="email" v-slot={field} :rules="isRequired">
              <TheTextInput
                v-bind="field"
                label="email"
                type="email"
                name="email"
              />
            </Field>
            <ErrorMessage class="error" name="email" />
            <Field name="password" v-slot={field} :rules="isRequired">
              <TheTextInput
                v-bind="field"
                label="password"
                type="password"
                name="password"
              />
            </Field>
            <ErrorMessage class="error" name="password" />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <TheButton
              type="submit"
              expand="block"
              icon="closeOutline"
              inner-text="confirm"
              class="ion-margin-top"
            ></TheButton>
          </ion-col>
        </ion-row>
      </Form>
    </ion-content>
  </ion-page>
</template>
<script>
import { modalController } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import Vuex from 'vuex';
import { Field, Form, ErrorMessage  } from 'vee-validate';
export default {
  name: 'TheLinkExternalAccountFormDialog',
  components: {
    Field,
    Form,
    ErrorMessage
  },
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
    onSubmit(data) {
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
    isRequired(value) {
      return value ? true : this.$t('validation.required');
    },
  },
};
</script>
<style scoped>
.info-text {
  font-size: 12px;
}
.error {
  font-size: 12px;
  color: #EB3333;
}
</style>
