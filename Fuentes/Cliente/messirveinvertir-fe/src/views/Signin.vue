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
          src="../../assets/logo-messirveinvertir.jpeg"
        ></ion-img>
      </div>
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
      <TheTextInput
        v-model="form.repeatPassword"
        label="repeat_password"
        type="password"
      ></TheTextInput>
      <TheButton
        @click="signin(form)"
        expand="block"
        icon="closeOutline"
        inner-text="signin"
        class="ion-margin-top"
      ></TheButton>
    </ion-content>
  </ion-page>
</template>
<style>
.image {
  width: 100px;
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}
</style>
<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        repeatPassword: '',
      },
    };
  },
  methods: {
    signin(form) {
      console.log(form);
    },
  },
};
</script>
