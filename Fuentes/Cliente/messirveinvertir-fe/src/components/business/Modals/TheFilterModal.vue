<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button size="small" @click="closeModal()">
            <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t(title) }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
    <div class="ion-padding">
        <ion-text>{{ $t('wallet.assets_name') }}</ion-text>
        <ion-item>
            <ion-chip v-for="(asset, index) in assets" :key="index">
                <ion-label >{{asset}}</ion-label>
                <ion-icon :icon="closeCircle" @click="removeAsset(index)"></ion-icon>
            </ion-chip>
            <ion-input type="text" v-model="form.selectedAsset" @ion-blur="addAsset(form.selectedAsset)"></ion-input>
        </ion-item>
    </div>
    <div class="ion-padding">
        <ion-text>{{ $t('wallet.linked_accounts') }}</ion-text>
        <TheSelector
          class="selector"
          v-model="form.selectedAccount"
          interface="action-sheet"
          :values="currentAccounts"
          multiple
        />
    </div>  
    <TheButton :inner-text="$t('wallet.filter')" @click="submitForm" expand="block"/>
    </ion-content>
  </ion-page>
</template>

<style>
.info-text {
  font-size: 12px;
}
</style>

<script>
import { modalController } from '@ionic/vue';
import { closeOutline, closeCircle } from 'ionicons/icons';
import Vuex from 'vuex';
export default {
  name: 'TheNewAccountFormModal',
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      closeOutline,
      closeCircle,
      form: {
        selectedAsset: '',
        selectedAccount: ''
      },
      assets: [],
    };
  },
  computed: {
    ...Vuex.mapState(['accounts', 'assets']),
    currentAccounts() {
      const accounts = [];
      this.accounts.currentAccounts.forEach((element) => {
          const newAccount = {
            value: element.name,
            displayName: element.name,
          };
          accounts.push(newAccount);
      });
      return accounts;
    },
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    addAsset(asset) {
        if (asset !== '') {
            this.assets.push(asset.toUpperCase());
            this.form.selectedAsset = '';
        }
    },
    addAccount(account) {
        if (account !== '') {
            this.accounts.push(account.toUpperCase());
            this.form.selectedAccount = '';
        }
    },
    removeAccount(i) {
        this.accounts.splice(i, 1)
    },
    removeAsset(i) {
        this.assets.splice(i, 1)
    },
    submitForm() {
      // TODO
      modalController.dismiss();
    },
  }
}
</script>
<style scoped>
.selector {
  width: 100%;
}
</style>