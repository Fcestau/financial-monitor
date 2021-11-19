import { Account } from '@/models/Account';
import { Asset } from '@/models/Asset';
import { Alert } from '@/models/Alert';
import { Operation } from '@/models/Operation';
import operationApiService from '@/services/operationsApiService';
import assetApiService from '@/services/assetApiService';
import accountApiService from '@/services/accountApiService';
import { createStore } from 'vuex';
import alertApiService from '@/services/alertApiService';
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
      currentAlerts: [],
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
    addAlertsInStore(state, alerts) {
      (state.alerts.currentAlerts as Alert[]) = alerts;
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
    async getCurrentAlerts({ commit }) {
      const data = await alertApiService.getAllAlerts();
      const alerts = await data.data.data;
      commit('addAlertsInStore', alerts);
    },

    async addNewAlert({ commit }, newAlert) {
      await alertApiService.addNewAlert(newAlert);
      const data = await alertApiService.getAllAlerts();
      const alerts = await data.data.data;
      commit('addAlertsInStore', alerts);
    },

    async deleteAlert({ commit }, alert) {
      await alertApiService.deleteAlert(alert);
      const data = await alertApiService.getAllAlerts();
      const alerts = await data.data.data;
      commit('addAlertsInStore', alerts);
    },
  },
  modules: {},
});
