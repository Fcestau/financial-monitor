import { Account } from '@/models/Account';
import { Asset } from '@/models/Asset';
import { Operation } from '@/models/Operation';
import operationApiService from '@/services/operationsApiService';
import assetApiService from '@/services/assetApiService';
import accountApiService from '@/services/accountApiService';
import { createStore } from 'vuex';

export default createStore({
  state: {
    operations: {
      currentOperations: [],
      loading: false,
    },
    accounts: {
      currentAccounts: [],
      loading: false,
    },
    assets: {
      currentAssets: [],
      loading: false,
    },
    alerts: {
      currentAlerts: [
        {
          id: 0,
          hourlyDeltaPrice: 1,
          hourlyDeltaVolume: null,
          frequency: 'Unique',
          lastAlertTimestamp: new Date().toISOString(),
          asset: {
            id: 0,
            name: 'USD',
            symbol: 'string',
            type: 'Fiat',
            date: new Date().toISOString(),
          },
          account: {
            id: 0,
            name: 'IOL trucha',
            type: 'Manual',
            createdAt: new Date().toISOString(),
            avatar:
              'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          },
        },
        {
          id: 2,
          hourlyDeltaPrice: null,
          hourlyDeltaVolume: 10,
          frequency: 'Daily',
          lastAlertTimestamp: new Date().toISOString(),
          asset: {
            id: 0,
            name: 'ETH',
            symbol: 'string',
            type: 'Fiat',
            date: new Date().toISOString(),
          },
          account: {
            id: 0,
            name: 'IOL trucha',
            type: 'Manual',
            createdAt: new Date().toISOString(),
            avatar:
              'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          },
        },
        {
          id: 3,
          hourlyDeltaPrice: 10,
          hourlyDeltaVolume: null,
          frequency: 'Always',
          lastAlertTimestamp: new Date().toISOString(),
          asset: {
            id: 0,
            name: 'LOMA',
            symbol: 'string',
            type: 'Fiat',
            date: new Date().toISOString(),
          },
          account: {
            id: 0,
            name: 'IOL trucha',
            type: 'Manual',
            createdAt: new Date().toISOString(),
            avatar:
              'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          },
        },
      ],
      loading: false,
    },
  },
  mutations: {
    // Operations
    addOperationsInStore(state, operations) {
      (state.operations.currentOperations as Operation[]) = operations;
    },

    // Assets
    addAssetsInStore(state, assets) {
      (state.assets.currentAssets as Asset[]) = assets;
    },

    // Accounts
    addAccountsInStore(state, accounts) {
      (state.accounts.currentAccounts as Account[]) = accounts;
    },

    // Alerts
    addNewAlert(state, newAlert) {
      (state.alerts.currentAlerts as any[]).push(newAlert);
    },

    deleteAlert(state, alert) {
      const index = state.alerts.currentAlerts.findIndex(
        (itemT) => itemT === alert
      );
      state.alerts.currentAlerts.splice(index, 1);
    },
  },
  actions: {
    // Operations
    async getCurrentOperations({ commit }) {
      const data = await operationApiService.getAllOperations();
      const operations = await data.data.data;
      commit('addOperationsInStore', operations);
    },

    async addNewOperation({ commit }, newOperation) {
      await operationApiService.addNewOperation(newOperation);
      const data = await operationApiService.getAllOperations();
      const operations = await data.data.data;
      commit('addOperationsInStore', operations);
    },

    async deleteOperation({ commit }, operationId) {
      await operationApiService.deleteOperation(operationId);
      const data = await operationApiService.getAllOperations();
      const operations = await data.data.data;
      commit('addOperationsInStore', operations);
    },

    // Accounts
    async getCurrentAccounts({ commit }) {
      const data = await accountApiService.getAllAccounts();
      const accounts = await data.data.data;
      commit('addAccountsInStore', accounts);
    },

    async addNewAccount({ commit }, newAccount) {
      await accountApiService.addNewAccount(newAccount);
      const data = await accountApiService.getAllAccounts();
      const accounts = await data.data.data;
      commit('addAccountsInStore', accounts);
    },

    async deleteAccount({ commit }, accountId) {
      await accountApiService.deleteAccount(accountId);
      const data = await accountApiService.getAllAccounts();
      const accounts = await data.data.data;
      commit('addAccountsInStore', accounts);
    },

    // Assets
    async getCurrentAssets({ commit }) {
      const data = await assetApiService.getAllAssets();
      const assets = await data.data.data;
      commit('addAssetsInStore', assets);
    },

    async addNewAsset({ commit }, newAsset) {
      await assetApiService.addNewAsset(newAsset);
      const data = await assetApiService.getAllAssets();
      const assets = await data.data.data;
      commit('addAssetsInStore', assets);
    },

    // Alert
    addNewAlert({ commit }, newAlert) {
      commit('addNewAlert', newAlert);
    },

    deleteAlert({ commit }, alert) {
      commit('deleteAlert', alert);
    },
  },
  modules: {},
});
