<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-title> {{ $t('alerts.active_alerts_title') }} </ion-title>
    </ion-toolbar>
    <TheButton
      class="ion-margin"
      router-link="create-alert"
      expand="block"
      icon="closeOutline"
      inner-text="alerts.addAlertButton"
    />
    <ion-content>
      <TheAlertItem
        v-for="item in currentAlerts"
        :key="item"
        :item="item"
        :action-icon="trashOutline"
        :can-select="item.account.type === 'Manual'"
        @selectedItem="deleteItem(item)"
      />
    </ion-content>
  </ion-page>
</template>
<script>
import Vuex from 'vuex';
import { trashOutline } from 'ionicons/icons';
import { alertController } from '@ionic/vue';

export default {
  name: 'ActiveAlerts',
  computed: {
    ...Vuex.mapState(['alerts']),
    currentAlerts() {
      return this.alerts.currentAlerts;
    },
  },
  methods: {
    ...Vuex.mapActions(['deleteAlert']),

    deleteItem(item) {
      this.deleteItemAlertConfirm(item);
    },
    async deleteItemAlertConfirm(item) {
      const alert = await alertController.create({
        header: this.$t('alerts.delete_alert'),
        message: this.$t('alerts.sure_delete_alert_ask'),
        buttons: [
          {
            text: this.$t('cancel'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            },
          },
          {
            text: this.$t('accept'),
            handler: () => {
              this.deleteAlert(item);
            },
          },
        ],
      });
      return alert.present();
    },
  },
  data() {
    return {
      trashOutline,
    };
  },
};
</script>
