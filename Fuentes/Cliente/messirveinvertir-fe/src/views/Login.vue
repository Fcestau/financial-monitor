<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="container">
        <ion-img
          class="image"
          src="../../assets/logo-messirveinvertir.png"
        ></ion-img>
      </div>
      <p class="ion-text-center ion-padding">{{ $t('login_phrase') }}</p>
      <Form @submit="login">
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
        <TheButton
          type="submit"
          expand="block"
          icon="closeOutline"
          inner-text="login"
          class="ion-margin-top"
        ></TheButton>
        <TheButton
          href="register"
          expand="block"
          icon="closeOutline"
          inner-text="signin"
          color="secondary"
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
import { FCM } from "@capacitor-community/fcm";
import TokenStore from '@/store/tokenStore';
import authApiService from '@/services/authApiService';
import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    async login(data) {
      try {
        const token = await authApiService.login(data);
        TokenStore.save(token.data.token);
        const user = await authApiService.user(token.data.token)
        FCM.subscribeTo({ topic: user.data.uid })
          .catch((err) => alert(err));
        this.$router.push('/');
      } catch (exception) {
        this.loginError = exception;
      }
    },
    isRequired(value) {
      return value ? true : this.$t('validation.required');
    },
  },
};
</script>
