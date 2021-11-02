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
          :values="operations.currentManualAccounts"
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
          :values="operations.currentManualAssets"
        />
        <ion-buttons>
          <ion-button size="small" @click="addNewAsset">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <TheTextInput
        v-model="form.assetValue"
        label="operation.assetValueLabel"
        :placeholder="$t('operation.assetValuePlaceholder')"
        type="number"
      />
      <TheTextInput
        v-model="form.amount"
        label="operation.amountLabel"
        type="number"
      />
      <TheSelector
        v-model="form.operationType"
        label="operation.operationTypeLabel"
        interface="action-sheet"
        :values="operationTypeValues"
      />
      <TheDatepicker
        :value="form.operationDate"
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

<script lang="ts">
import { add } from 'ionicons/icons';
import { SelectorType } from '@/models/SelectorType';
import { Operation, OperationType } from '@/models/Operation';
import TheNewAccountFormModal from '../business/Modals/TheNewAccountFormModal.vue';
import TheNewAssetFormModal from '../business/Modals/TheNewAssetFormModal.vue';
import { modalController } from '@ionic/vue';
import Vuex from 'vuex';
export default {
  computed: {
    ...Vuex.mapState(['operations', 'accounts', 'assets']),
  },

  data() {
    const operationTypeValues: Array<SelectorType<OperationType>> = [
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

    const form: Operation = {
      id: 0,
      account: {
        id: 0,
        name: '',
        type: 'Manual',
        createdAt: new Date().toISOString(),
      },
      quantity: 0,
      usdPrice: 0,
      type: 'Buy',
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
    submitForm(form: Operation) {
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
