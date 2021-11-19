import { Account } from '@/models/Account';
import { Asset } from '@/models/Asset';
import { Alert } from '@/models/Alert';
import { Operation } from '@/models/Operation';
import { createStore } from 'vuex';
import  alertApiService  from '../services/alertApiService'
export default createStore({
  state: {
    operations: {
      currentOperations: [
        {
          id: 0,
          account: {
            id: 0,
            name: 'BINANCE',
            type: 'Manual',
            createdAt: new Date().toISOString(),
            avatar:
              'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          },
          asset: {
            id: 0,
            name: 'IOL',
            symbol: 'string',
            type: 'Fiat',
            date: new Date().toISOString(),
          },
          quantity: 300,
          usdPrice: 300,
          type: 'Venta',
          timestamp: '06/05/2021:18:20',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
        },
        {
          id: 1,
          account: {
            id: 1,
            name: 'BINANCE',
            type: 'Manual',
            createdAt: new Date().toISOString(),
            avatar:
              'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          },
          asset: {
            id: 0,
            name: 'string',
            symbol: 'string',
            type: 'Fiat',
            date: new Date().toISOString(),
          },
          quantity: 300,
          usdPrice: 300,
          type: 'Venta',
          timestamp: '06/05/2021:18:20',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
        },
      ],
      loading: false,
    },
    accounts: {
      currentAccounts: [
        {
          id: 0,
          name: 'IOL',
          type: 'Manual',
          createdAt: new Date().toISOString(),
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
        },
        {
          id: 1,
          name: 'IOL - Franco',
          type: 'Linked',
          createdAt: new Date().toISOString(),
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
        },
      ],
      loading: false,
    },
    assets: {
      currentAssets: [
        {
          id: 0,
          name: 'string',
          symbol: 'string',
          type: 'Fiat',
          date: new Date().toISOString(),
        },
      ],
      loading: false,
    },
    alerts: {
      currentAlerts: [],
      loading: false,
    },
  },
  mutations: {
    // Operations
    addNewOperation(state, newOperation) {
      (state.operations.currentOperations as Operation[]).push(newOperation);
    },

    deleteOperation(state, operation) {
      const index = state.operations.currentOperations.findIndex(
        (itemT) => itemT === operation
      );
      state.operations.currentOperations.splice(index, 1);
    },

    // Assets
    getCurrentAssets(state) {
      return state.assets.currentAssets;
    },

    addNewAsset(state, newAsset) {
      (state.assets.currentAssets as Asset[]).push(newAsset);
    },

    deleteAsset(state, asset) {
      const index = state.assets.currentAssets.findIndex(
        (itemT) => itemT === asset
      );
      state.assets.currentAssets.splice(index, 1);
    },

    // Accounts
    getCurrentAccounts(state) {
      return state.accounts.currentAccounts;
    },

    addNewAccount(state, newAccount) {
      (state.accounts.currentAccounts as Account[]).push(newAccount);
    },

    deleteAccount(state, account) {
      const index = state.accounts.currentAccounts.findIndex(
        (itemT) => itemT === account
      );
      state.accounts.currentAccounts.splice(index, 1);
    },

    // Alerts
    addAccountsInStore(state, alerts) {
      (state.alerts.currentAlerts as Alert[]) = alerts;
    },

  },
  actions: {
    // Operations
    getCurrentOperations({ commit }) {
      commit('getCurrentOperations');
    },

    addNewOperation({ commit }, newOperation) {
      commit('addNewOperation', newOperation);
    },

    deleteOperation({ commit }, operation) {
      commit('deleteOperation', operation);
    },

    // Accounts
    getCurrentAccounts({ commit }) {
      commit('getCurrentAccounts');
    },

    addNewAccount({ commit }, newAccount) {
      commit('addNewAccount', newAccount);
    },

    deleteAccount({ commit }, account) {
      commit('deleteAccount', account);
    },

    // Assets
    getCurrentAssets({ commit }) {
      commit('getCurrentAssets');
    },

    addNewAsset({ commit }, newAsset) {
      commit('addNewAsset', newAsset);
    },

    deleteAsset({ commit }, asset) {
      commit('deleteAsset', asset);
    },

    // Alert
    async getCurrentAlerts({ commit }) {
      const data = await alertApiService.getAllAlerts();
      const alerts = await data.data.data;
      commit('addAccountsInStore', alerts);
    },

    async addNewAlert({ commit }, newAlert) {
      await alertApiService.addNewAlert(newAlert);
      const data = await alertApiService.getAllAlerts();
      const alerts = await data.data.data;
      commit('addAccountsInStore', alerts);
    },

    async deleteAlert({ commit }, alert) {
      await alertApiService.deleteAlert(alert);
      const data = await alertApiService.getAllAlerts();
      const alerts = await data.data.data;
      commit('addAccountsInStore', alerts);
    },
  },
  modules: {},
});
