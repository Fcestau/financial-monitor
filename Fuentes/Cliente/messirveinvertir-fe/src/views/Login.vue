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
      <TheButton
        @click="login(form)"
        expand="block"
        icon="closeOutline"
        inner-text="login"
        class="ion-margin-top"
      ></TheButton>
      <TheButton
        href="signin"
        expand="block"
        icon="closeOutline"
        inner-text="signin"
        color="secondary"
        class="ion-margin-top"
      ></TheButton>
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
</style>
<script>
import { FCM } from "@capacitor-community/fcm";
import TokenStore from '@/store/tokenStore';
import authApiService from '@/services/authApiService';
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login(form) {
      try {
        const token = await authApiService.login(form);
        TokenStore.save(token.data.token);
        const user = await authApiService.user(token.data.token)
        FCM.subscribeTo({ topic: user.data.uid })
          .catch((err) => alert(err));
        this.$router.push('/');
      } catch (exception) {
        this.loginError = exception;
      }
    },
  },
};
</script>
