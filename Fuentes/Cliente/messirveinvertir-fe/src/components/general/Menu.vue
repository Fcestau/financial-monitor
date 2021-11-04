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
        <ion-text class="ion-text-uppercase">{{ $t('menu.messirveinvertir') }}</ion-text>
      </ion-toolbar>
        <ion-avatar class="avatar">
          <img :src="avatarUrl">
        </ion-avatar>
        <div class="ion-text-center user-name">
          <ion-label>{{userName}}</ion-label>
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
        <ion-item color="tertiary" href=""
          ><div>{{ $t('menu.wallet') }}</div></ion-item
        >
        <ion-item color="tertiary" href="/chart"
          ><div>{{ $t('menu.charts') }}</div></ion-item
        >
        <ion-item color="tertiary" href="/barcode-scanner"
          ><div>{{ $t('menu.scan_qr_code') }}</div></ion-item
        >
        <ion-item color="tertiary" href=""
          ><div>{{ $t('menu.active_alerts') }}</div></ion-item
        >
      </ion-list>
    </ion-content>
        <TheButton inner-text="menu.logout" @click="logout" color="tertiary"/>
  </ion-menu>
  <ion-router-outlet id="main"></ion-router-outlet>
</template>
<style scoped>
.my-custom-menu {
  --background: #3444e4;
}

.avatar {
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
  color:white;
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
export default ({
    props: {
    userName: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
  },
  methods: {
    logout() {
      this.$emit('logout');
    }
  },

  });
</script>
