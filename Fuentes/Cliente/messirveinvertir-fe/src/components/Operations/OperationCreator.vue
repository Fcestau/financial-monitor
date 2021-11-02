<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="operations-history"></ion-back-button>
        </ion-buttons>
        <ion-title> {{ $t('operation.newOperationTitle') }} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="container">
        <TheSelector
          class="selector"
          v-model="form.account"
          interface="action-sheet"
          label="operation.accountLabel"
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
          label="operation.assetLabel"
          interface="action-sheet"
          :values="currentAssets"
        />
        <ion-buttons>
          <ion-button size="small" @click="addNewAsset">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <TheTextInput
        v-model="form.usdPrice"
        label="operation.assetValueLabel"
        :placeholder="$t('operation.assetValuePlaceholder')"
        type="number"
      />
      <TheTextInput
        v-model="form.quantity"
        label="operation.amountLabel"
        type="number"
      />
      <TheSelector
        v-model="form.type"
        label="operation.operationTypeLabel"
        interface="action-sheet"
        :values="operationTypeValues"
      />
      <TheDatepicker
        :value="form.timestamp"
        label="operation.operationDateLabel"
        display-format="D/M/YY H:mm"
      />
      <TheButton
        @click="submitForm(form)"
        expand="block"
        icon="closeOutline"
        inner-text="confirm"
        class="ion-margin-top"
      ></TheButton>
    </ion-content>
  </ion-page>
</template>
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
import { SelectorType } from '@/models/SelectorType';
import { Operation, OperationType } from '@/models/Operation';
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
    const operationTypeValues = [
      {
        value: 'Buy',
        displayName: 'Compra',
      },
      {
        value: 'Sell',
        displayName: 'Venta',
      },
      {
        value: 'Withdraw',
        displayName: 'Retiro',
      },
      {
        value: 'Deposit',
        displayName: 'Depósito',
      },
    ];

    const form = {
      id: 0,
      account: {
        id: 0,
        name: '',
        type: 'Manual',
        createdAt: new Date().toISOString(),
      },
      quantity: null,
      usdPrice: null,
      type: '',
      asset: {
        id: 0,
        name: '',
        symbol: '',
        type: 'Fiat',
        date: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };

    return {
      operationTypeValues,
      add,
      form,
    };
  },
  methods: {
    submitForm(form) {
      console.log(form);
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
