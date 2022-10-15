<template>
  <ion-page>
    <Menu @logout="logout"> </Menu>
  </ion-page>
</template>

<script>
import authApiService from '@/services/authApiService';
import TokenStore from '@/store/tokenStore';
import { menuController } from '@ionic/vue';
const loginUrl = '/login';

export default {
  name: 'Home',
  methods: {
    async logout() {
      try {
        const currentTokenValue = TokenStore.get();
        await authApiService.logout(currentTokenValue);
        TokenStore.clean();
        this.$router.push(loginUrl);
        menuController.close();
      } catch (exception) {
        console.log(exception);
      }
    },
  },
};
</script>
