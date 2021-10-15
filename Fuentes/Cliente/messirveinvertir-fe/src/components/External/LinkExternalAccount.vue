<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button auto-hide="false"></ion-back-button>
        </ion-buttons>
        <ion-title>
          {{ $t('external.link_account') }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <p class="ion-text-center">
          {{ $t('external.select_external_account') }}
        </p>
        <ion-list>
          <TheExternalAccountItem 
            v-for="item in items" 
            :key="item" 
            :item="item" 
            :action-icon="chevronForwardOutline" 
            :show-amount="false" 
            @selectedItem="openModal(item)"
            >
          </TheExternalAccountItem>
        </ion-list>
    </ion-content>
  </ion-page>
</template>
<script>
import { modalController } from '@ionic/vue';
import TheLinkExternalAccountFormModal from '../business/Modals/TheLinkExternalAccountFormModal.vue'
import { chevronForwardOutline } from 'ionicons/icons';
export default ({
  data() {
    return {
      showDialog: false,
      item: { name: this.$t('invertir_online')},
      items: [
        {
          title: 'IOL',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
          assetType: 'USD',
          amount: -300,
        },
        {
          title: 'Binance',
          avatar: 'https://bitbase.es/img/coins/BNB.png',
          assetType: 'USD',
          amount: 300,
        },
        {
          title: 'Banco Nación',
          avatar:
            'https://w7.pngwing.com/pngs/169/504/png-transparent-el-banco-de-la-nacion-argentina-bank-transaction-account-bank-blue-text-logo-thumbnail.png',
          assetType: 'USD',
          amount: -300,
        },
        {
          title: 'buenbit',
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          assetType: 'USD',
          amount: 300,
        },
      ], 
    }
  },
  setup() {
    return {
      chevronForwardOutline
    };
  },
  methods: {
    async openModal(item) {
      const modal = await modalController
        .create({
          component: TheLinkExternalAccountFormModal,
          cssClass: 'my-custom-class',
          componentProps: {
            title: item.title
          },
        })
      return modal.present();
    },
  }
});
</script>
