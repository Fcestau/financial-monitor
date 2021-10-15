<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-title> {{ $t('external.accountListTitle') }} </ion-title>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <ion-button expand="block" routerLink="./link-external-account">
        {{ $t('external.linkAccountListButton') }}
      </ion-button>
      <ItemsList :items="items" @deleteItem="deleteItem($event)" />
    </ion-content>
  </ion-page>
</template>

<script>
import ItemsList from '@/components/general/ItemsList.vue';
import { alertController } from '@ionic/vue';

export default {
  name: 'ExternalAccountList',
  components: { ItemsList },
  methods: {
    deleteItem(item) {
      this.deleteItemAlertConfirm(item);
    },

    async deleteItemAlertConfirm(item) {
      const alert = await alertController.create({
        header: 'Desvincular cuenta',
        message:
          '¿Esta seguro que desea desvincular la cuenta de <strong>' +
          item.title +
          '</strong>?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            },
          },
          {
            text: 'Aceptar',
            handler: () => {
              //TODO: hacer logica correspondiente a utilizar el eliminar cuenta del backend
              const index = this.items.findIndex((itemT) => itemT === item);
              this.items.splice(index, 1);
            },
          },
        ],
      });
      return alert.present();
    },
  },
  data() {
    return {
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
    };
  },
};
</script>
<style></style>
