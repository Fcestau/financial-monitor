<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="active-alerts"></ion-back-button>
        </ion-buttons>
        <ion-title> {{ $t('alerts.newAlertTitle') }} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="container">
        <TheSelector
          class="selector"
          v-model="form.account"
          interface="action-sheet"
          label="alerts.accountLabel"
          :values="currentAccounts"
        />
        <ion-buttons>
          <ion-button size="small" @click="addNewAccount">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <div class="container">
        <TheSelector
          class="selector"
          v-model="form.asset"
          label="alerts.assetLabel"
          interface="action-sheet"
          :values="currentAssets"
        />
        <ion-buttons>
          <ion-button size="small" @click="addNewAsset">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <ion-radio-group v-model="form.creteria">
        <ion-list-header>
          <ion-label> {{ $t('alerts.criteriaLabel') }}</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>Volumen</ion-label>
          <ion-radio slot="start" value="volume"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Precio</ion-label>
          <ion-radio slot="start" value="price"></ion-radio>
        </ion-item>
      </ion-radio-group>
      <TheTextInput
        v-model="form.percentageChange"
        label="alerts.percentageChangeLabel"
        type="number"
      />
      <TheSelector
        v-model="form.frequency"
        label="alerts.frequencyLabel"
        interface="action-sheet"
        :values="frequencyValues"
      />

      <TheButton
        @click="submitForm(form)"
        expand="block"
        icon="closeOutline"
        inner-text="confirm"
        class="ion-margin-top"
      ></TheButton>
    </ion-content> </ion-page
></template>
<style>
.container {
  display: flex;
}
.selector {
  width: 100%;
}
</style>

<script>
import { add } from 'ionicons/icons';
import TheNewAccountFormModal from '../business/Modals/TheNewAccountFormModal.vue';
import TheNewAssetFormModal from '../business/Modals/TheNewAssetFormModal.vue';
import { modalController } from '@ionic/vue';
import Vuex from 'vuex';

export default {
  computed: {
    ...Vuex.mapState(['accounts', 'assets']),
    currentAccounts() {
      const accounts = [];
      this.accounts.currentAccounts.forEach((element) => {
        if (element.type === 'Manual') {
          const newAccount = {
            value: element.name,
            displayName: element.name,
          };
          accounts.push(newAccount);
        }
      });
      return accounts;
    },
    currentAssets() {
      const assets = [];
      this.assets.currentAssets.forEach((element) => {
        const newAsset = {
          value: element.name,
          displayName: element.name,
        };
        assets.push(newAsset);
      });
      return assets;
    },
  },

  data() {
    const frequencyValues = [
      {
        value: 'Always',
        displayName: 'Siempre',
      },
      {
        value: 'Daily',
        displayName: 'Diariamente',
      },
      {
        value: 'Unique',
        displayName: 'Única',
      },
    ];

    const form = {
      id: 0,
      account: '',
      asset: '',
      percentageChange: null,
      creteria: '',
      frequency: '',
      lastAlertTimestamp: new Date().toISOString(),
    };

    return {
      frequencyValues,
      add,
      form,
    };
  },
  methods: {
    ...Vuex.mapActions(['addNewAlert']),
    submitForm(form) {
      let percentage;
      if (form.creteria === 'price') {
        percentage = {
          hourlyDeltaPrice: form.percentageChange,
          hourlyDeltaVolume: null,
        };
      } else {
        percentage = {
          hourlyDeltaPrice: null,
          hourlyDeltaVolume: form.percentageChange,
        };
      }

      const newAlert = {
        id: form.id,
        frequency: form.frequency,
        lastAlertTimestamp: form.lastAlertTimestamp,
        account: {
          id: 0,
          name: form.account,
          type: 'Manual',
          createdAt: new Date().toISOString(),
        },
        asset: {
          id: 0,
          name: form.asset,
          symbol: form.asset,
          type: 'Fiat',
          date: new Date().toISOString(),
        },
        ...percentage,
      };
      this.addNewAlert(newAlert);
    },

    async addNewAccount() {
      const modal = await modalController.create({
        component: TheNewAccountFormModal,
        cssClass: 'my-custom-class',
        componentProps: {
          title: 'operation.accountCreatorFormTitle',
        },
      });
      return modal.present();
    },
    async addNewAsset() {
      const modal = await modalController.create({
        component: TheNewAssetFormModal,
        cssClass: 'my-custom-class',
        componentProps: {
          title: 'operation.assetCreatorFormTitle',
        },
      });
      return modal.present();
    },
  },
};
</script>
