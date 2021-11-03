<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> MESSIRVEINVERTIR </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
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

      <ion-button
        expand="block"
        inner-text="confirm"
        class="ion-margin-top"
        v-on:click="login(form)"
      >
        Login
      </ion-button>
    </ion-content>
  </ion-page>
</template>
<script>
import TokenStore from '@/store/tokenStore';
import LoginApiService from '@/services/loginApiService';

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
        const token = await LoginApiService.login(form);
        TokenStore.save(token);
        this.$router.push('/');
        console.log('se logeo perro');
      } catch (exception) {
        this.loginError = exception;
      }
    },
  },
};
</script>
