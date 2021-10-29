<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false" />
      </ion-buttons>
      <ion-title> {{ $t('external.accountListTitle') }} </ion-title>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <TheButton
        expand="block"
        inner-text="external.linkAccountListButton"
        router-link="./link-external-account"
        class="ion-margin-bottom"
      />
      <NoInformationCard v-if="accounts.length === 0" />
      <TheGeneraltem
        v-for="item in accounts.currentAccounts"
        :key="item"
        :item="item"
        :action-icon="trashOutline"
        @selectedItem="deleteItem(item)"
      />
    </ion-content>
  </ion-page>
</template>
<script>
import { alertController } from '@ionic/vue';
import { trashOutline } from 'ionicons/icons';
import Vuex from 'vuex';

export default {
  name: 'ExternalAccountList',
  methods: {
    ...Vuex.mapActions(['deleteAccount']),

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
              this.deleteAccount(item);
            },
          },
        ],
      });
      return alert.present();
    },
  },
  setup() {
    return {
      trashOutline,
    };
  },
  computed: {
    ...Vuex.mapState(['accounts']),
  },

  mounted() {
    // this.accounts.forEach((element) => {
    //   if (element.amount > 0) {
    //     element.color = 'success';
    //   } else {
    //     element.color = 'danger';
    //   }
    // });
  },
};
</script>
