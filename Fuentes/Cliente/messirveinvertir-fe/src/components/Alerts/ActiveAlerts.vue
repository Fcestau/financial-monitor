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
      inner-text="Añadir alerta"
    />
    <ion-content>
      <TheAlertItem
        v-for="item in currentAlerts"
        :key="item"
        :item="item"
        :action-icon="trashOutline"
        :can-select="item.account.type === 'Manual'"
        @selectedItem="deleteAlert(item)"
      />
      <TheAlertItem
        v-for="item in currentAlerts"
        :key="item"
        :item="item"
        :action-icon="trashOutline"
        :can-select="item.account.type === 'Manual'"
        @selectedItem="deleteAlert(item)"
      />
    </ion-content>
  </ion-page>
</template>
<script>
import Vuex from 'vuex';
import { trashOutline } from 'ionicons/icons';

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
  },
  data() {
    return {
      trashOutline,
    };
  },
};
</script>
