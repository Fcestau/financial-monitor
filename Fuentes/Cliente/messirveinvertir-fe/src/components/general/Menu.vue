<template>
  <ion-menu side="start" menu-id="custom" class="my-custom-menu" content-id="main" color="tertiary">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title class="ion-text-center ion-text-uppercase">{{ $t('menu.messirveinverir') }}</ion-title>
      </ion-toolbar>
      <ion-card>
        <ion-avatar class="avatar">
          <img src="https://pbs.twimg.com/media/EUCh095XQAIXfbM.jpg">
        </ion-avatar>
        <div class="ion-text-center user-name">
          <ion-label>Rodrigo Mignola</ion-label>
        </div>
      </ion-card>
      
    </ion-header>
    <ion-content color="tertiary">
      <ion-list class="ion-list-container">
          <ion-item color="tertiary" href="/external-accounts"><div style="">{{ $t('menu.account_listing') }}</div></ion-item>
          <ion-item color="tertiary" href=""><div >{{ $t('menu.wallet') }}</div></ion-item>
          <ion-item color="tertiary" href="/chart"><div >{{ $t('menu.charts') }}</div></ion-item>
          <ion-item color="tertiary" href=""><div >{{ $t('menu.operation_history') }}</div></ion-item>
          <ion-item color="tertiary" href="/barcode-scanner"><div >{{ $t('menu.scan_qr_code') }}</div></ion-item>
          <ion-item color="tertiary" href=""><div >{{ $t('menu.active_alerts') }}</div></ion-item>
      </ion-list>
    </ion-content>
    <div class="ion-text-center logout">
        <ion-text>{{ $t('menu.logout')}}</ion-text>
    </div>
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
  color: black
}

.user-name {
  margin-top: 5px; 
  margin-bottom: 100px; 
  color:white;
}

.logout {
  margin-top: 80px; 
  margin-bottom: 30px;
  color:white;
}

.ion-list-container{
  padding-bottom: 0px;
  padding-top: 0px;
}

ion-item {
  margin: 0 auto;
}
</style>

<script>
import {menuController} from '@ionic/vue';
export default ({
  components: {
  },
  methods: {
    openFirst() {
      menuController.enable(true, 'first');
      menuController.open('first');
    },
    openEnd() {
      menuController.open('end');
    },
    openCustom() {
      menuController.enable(true, 'custom');
      menuController.open('custom');
    }
  }
});
</script>