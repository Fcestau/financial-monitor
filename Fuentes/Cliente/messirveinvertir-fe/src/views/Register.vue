<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button
          default-href="login"
          auto-hide="false"
        ></ion-back-button>
      </ion-buttons>
      <ion-title>
        {{ $t('signin') }}
      </ion-title>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <div class="container">
        <ion-img
          class="image"
          src="../../assets/logo-messirveinvertir.png"
        ></ion-img>
      </div>
      <Form @submit="register">
        <Field name="display_name" v-slot="{ field }" :rules="isRequired">
          <TheTextInput
            v-bind="field"
            label="displayName"
            type="text"
            name="display_name"
          ></TheTextInput>
        </Field>
        <ErrorMessage class="error" name="display_name" />
        <Field name="email" v-slot="{ field }" :rules="isRequired">
          <TheTextInput
            v-bind="field"
            label="email"
            type="email"
            name="email"
          ></TheTextInput>
        </Field>
        <ErrorMessage class="error" name="email" />
        <Field name="password" v-slot="{ field }" :rules="isRequired">
          <TheTextInput
            v-bind="field"
            label="password"
            type="password"
            name="password"
          ></TheTextInput>
        </Field>
        <ErrorMessage class="error" name="password" />
        <Field name="repeatPassword" v-slot="{ field }" :rules="isRequired">
          <TheTextInput
            v-bind="field"
            label="repeat_password"
            type="password"
            name="repeatPassword"
          ></TheTextInput>
        </Field>
        <ErrorMessage class="error" name="repeatPassword" />
        <TheButton
          type="submit"
          expand="block"
          icon="closeOutline"
          inner-text="signin"
          class="ion-margin-top"
        ></TheButton>
      </Form>
    </ion-content>
  </ion-page>
</template>
<style>
.image {
  width: 150px;
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}
.error {
  font-size: 12px;
  color: #eb3333;
}
</style>
<script>
import authApiService from '@/services/authApiService';
import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    async register(data) {
      delete data.repeatPassword
      await authApiService.register(data);
      this.$router.push('/login');
    },
    isRequired(value) {
      return value ? true : this.$t('validation.required');
    },
  },
};
</script>
