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
    <Form @submit="onSubmit" >
      <div class="container">
        <Field name="account_id" v-slot={field} :rules="isRequired">
          <TheSelector
            class="selector"
            v-bind="field"
            interface="action-sheet"
            label="operation.accountLabel"
            :values="currentAccounts"
            name="account_id"
          />
        </Field>
        <ion-buttons>
          <ion-button size="small" @click="addNewAccount">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <ErrorMessage class="error" name="account_id" />
      <div class="container">
        <Field name="asset_id" v-slot={field} :rules="isRequired">
          <TheSelector
            class="selector"
            v-bind="field"
            name="asset_id"
            label="operation.assetLabel"
            interface="action-sheet"
            :values="currentAssets"
          />
        </Field>
        <ion-buttons>
          <ion-button size="small" @click="addNewAsset">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <ErrorMessage class="error" name="asset_id" />
      <Field name="usd_price" v-slot={field} :rules="isRequired">
        <TheTextInput
          name="usd_price"
          v-bind="field"
          label="operation.assetValueLabel"
          :placeholder="$t('operation.assetValuePlaceholder')"
          type="number"
        />
      </Field>
      <ErrorMessage class="error" name="usd_price" />
      <Field name="quantity" v-slot={field} :rules="isRequired">
        <TheTextInput
          v-bind="field"
          name="quantity"
          label="operation.amountLabel"
          type="number"
        />
      </Field>
      <ErrorMessage class="error" name="quantity" />
      <Field name="type" v-slot={field} :rules="isRequired">
        <TheSelector
          v-bind="field"
          name="type"
          label="operation.operationTypeLabel"
          interface="action-sheet"
          :values="operationTypeValues"
        />
      </Field>
      <ErrorMessage class="error" name="type" />
      <Field name="timestamp" v-slot={field} :rules="isRequired">
        <TheDatepicker
          v-bind="field"
          name="timestamp"
          label="operation.operationDateLabel"
          display-format="D/M/YY H:mm"
        />
      </Field>
      <ErrorMessage class="error" name="timestamp" />
      <TheButton
        type="submit"
        expand="block"
        icon="closeOutline"
        inner-text="confirm"
        class="ion-margin-top"
      ></TheButton>
    </Form>
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
.error {
  font-size: 12px;
  color: #EB3333;
}
</style>

<script>
import { add } from 'ionicons/icons';
import TheNewAccountFormModal from '../business/Modals/TheNewAccountFormModal.vue';
import TheNewAssetFormModal from '../business/Modals/TheNewAssetFormModal.vue';
import { modalController } from '@ionic/vue';
import Vuex from 'vuex';
import { Field, Form, ErrorMessage  } from 'vee-validate';
export default {
  components: {
    Field,
    Form,
    ErrorMessage
  },
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

    return {
      operationTypeValues,
      add,
    };
  },
  methods: {
    ...Vuex.mapActions(['addNewOperation']),

    onSubmit(data) {
      const newOperation = data
      newOperation.quantity = parseFloat(data.quantity)
      newOperation.usd_price = parseFloat(data.usd_price)
      console.log(newOperation);
      this.addNewOperation(newOperation);
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
    isRequired(value) {
      return value ? true : this.$t('validation.required');
    },
  },
};
</script>
