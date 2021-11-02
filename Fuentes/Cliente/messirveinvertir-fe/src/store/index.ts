import { Account } from '@/models/Account';
import { Asset } from '@/models/Asset';
import { Operation } from '@/models/Operation';
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
  },
  actions: {
    // Operations
    getCurrentOperations({ commit }) {
      commit('getCurrentOperations');
    },

    // Accounts
    getCurrentAccounts({ commit }) {
      commit('getCurrentAccounts');
    },

    addNewAccount({ commit }, newOperation) {
      commit('addNewAccount', newOperation);
    },

    deleteAccount({ commit }, operation) {
      commit('deleteAccount', operation);
    },

    // Assets
    getCurrentAssets({ commit }) {
      commit('getCurrentAssets');
    },

    addNewAsset({ commit }, newOperation) {
      commit('addNewAsset', newOperation);
    },

    deleteAsset({ commit }, operation) {
      commit('deleteAsset', operation);
    },
  },
  modules: {},
});
