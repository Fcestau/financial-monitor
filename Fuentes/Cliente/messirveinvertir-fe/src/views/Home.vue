<template>
  <ion-page>
    <Menu
      user-name="Rodrigo Mignola"
      avatar-url="https://us.123rf.com/450wm/deagreez/deagreez1909/deagreez190903983/130021023-soy-el-mejor-foto-de-chico-incre%C3%ADble-que-indica-los-dedos-pulgar-sobre-s%C3%AD-mismo-usar-camisa-a-cuadro.jpg?ver=6"
      @logout="logout"
    >
    </Menu>
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
