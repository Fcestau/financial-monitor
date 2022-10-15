<template>
  <ion-menu
    side="start"
    menu-id="custom"
    class="my-custom-menu"
    content-id="main"
    color="tertiary"
  >
    <ion-header>
      <ion-toolbar class="ion-text-center" color="tertiary">
        <ion-text class="ion-text-uppercase">{{
          $t('menu.messirveinvertir')
        }}</ion-text>
      </ion-toolbar>
      <TheAvatar
        class="avatar"
        :displayName="userData.data.display_name"
      ></TheAvatar>
      <div class="ion-text-center user-name">
        <ion-label>{{ userData.data.display_name }}</ion-label>
      </div>
    </ion-header>
    <ion-content color="tertiary">
      <ion-list class="ion-list-container">
        <ion-item color="tertiary" href="/operations-history"
          ><div>{{ $t('menu.operations_history') }}</div></ion-item
        >
        <ion-item color="tertiary" href="/external-account"
          ><div style="">{{ $t('menu.account_listing') }}</div></ion-item
        >
        <ion-item color="tertiary" href="/wallet"
          ><div>{{ $t('menu.wallet') }}</div></ion-item
        >
        <ion-item color="tertiary" href="/chart"
          ><div>{{ $t('menu.charts') }}</div></ion-item
        >
        <ion-item color="tertiary" href="/barcode-scanner"
          ><div>{{ $t('menu.scan_qr_code') }}</div></ion-item
        >
        <ion-item color="tertiary" href="/active-alerts"
          ><div>{{ $t('menu.active_alerts') }}</div></ion-item
        >
      </ion-list>
    </ion-content>
    <TheButton inner-text="menu.logout" @click="logout" color="tertiary" />
  </ion-menu>
  <ion-router-outlet id="main"></ion-router-outlet>
</template>
<style scoped>
.my-custom-menu {
  --background: #3444e4;
}

.avatar {
  font-size: 40px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 80px;
  height: 80px;
  color: black;
}

.user-name {
  margin-top: 5px;
  margin-bottom: 40px;
  color: white;
}

.logout {
  margin-top: 80px;
  margin-bottom: 30px;
  color: white;
}

.ion-list-container {
  padding-bottom: 0px;
  padding-top: 0px;
}

ion-item {
  margin: 0 auto;
}
</style>
<script>
import TokenStore from '@/store/tokenStore';
import authApiService from '@/services/authApiService';

export default {
  data() {
    return {
      userData: { data: {} },
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
  },
  async mounted() {
    const currentTokenValue = TokenStore.get();
    if (currentTokenValue) {
      this.userData = await authApiService.user(currentTokenValue);
    }
  },
};
</script>
