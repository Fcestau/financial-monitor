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
      <Form @submit="onSubmit" >
        <div class="container">
        <Field name="account_id" v-slot={field} :rules="isRequired">
          <TheSelector
            v-bind="field"
            class="selector"
            name="account_id"
            interface="action-sheet"
            label="alerts.accountLabel"
            :values="currentAccounts"
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
              v-bind="field"
              class="selector"
              label="alerts.assetLabel"
              interface="action-sheet"
              :values="currentAssets"
              name="asset_id"
            />
          </Field>
          <ion-buttons>
            <ion-button size="small" @click="addNewAsset">
              <ion-icon slot="icon-only" :icon="add"></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
        <ErrorMessage class="error" name="asset_id" />
        <Field name="creteria" v-slot={field} :rules="isRequired">
          <ion-radio-group v-bind="field" name="creteria">
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
        </Field>
        <ErrorMessage class="error" name="creteria" />
        <Field name="percentageChange" v-slot={field} :rules="isPercentage">
          <TheTextInput
            v-bind="field"
            name="percentageChange"
            label="alerts.percentageChangeLabel"
            type="number"
            placeholder="%"
          />
        </Field>
        <ErrorMessage class="error" name="percentageChange" />
        <Field name="frequency" v-slot={field} :rules="isRequired">
          <TheSelector
            v-bind="field"
            name="frequency"
            label="alerts.frequencyLabel"
            interface="action-sheet"
            :values="frequencyValues"
          />
        </Field>
        <ErrorMessage class="error" name="frequency" />
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
    onSubmit(data) {
      const newAlert = {
        ...data,
        hourlyDeltaPrice: data.creteria === 'price' ? parseFloat(data.percentageChange) : 0,
        hourlyDeltaVolume: data.creteria === 'volume' ? parseFloat(data.percentageChange) : 0,
      };
      delete newAlert.percentageChange
      delete newAlert.creteria
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
    isRequired(value) {
      return value ? true : this.$t('validation.required');
    },
    isPercentage(value) {
      return parseFloat(value) >= 0 && parseFloat(value) <= 100 ? true : this.$t('validation.percentage');
    }
  },
};
</script>
