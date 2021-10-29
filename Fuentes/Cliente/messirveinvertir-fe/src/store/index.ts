import { createStore } from 'vuex';

export default createStore({
  state: {
    operations: {
      currentOperations: [],
      loading: false,
    },
    accounts: {
      currentAccounts: [
        {
          title: 'Invertir Online',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
          assetType: 'USD',
          amount: -300,
        },
        {
          title: 'Binance',
          avatar: 'https://bitbase.es/img/coins/BNB.png',
          assetType: 'USD',
          amount: 300,
        },
        {
          title: 'Banco Nación',
          avatar:
            'https://w7.pngwing.com/pngs/169/504/png-transparent-el-banco-de-la-nacion-argentina-bank-transaction-account-bank-blue-text-logo-thumbnail.png',
          assetType: 'USD',
          amount: -300,
        },
        {
          title: 'buenbit',
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          assetType: 'USD',
          amount: 300,
        },
      ],
      loading: false,
    },
    assets: {
      currentAssets: [],
      loading: false,
    },
  },
  mutations: {
    // Operations
    getCurrentOperations(state) {
      return state.operations.currentOperations;
    },

    addNewOperation(state, newOperation) {
      (state.operations.currentOperations as any[]).push(newOperation);
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
      (state.assets.currentAssets as any[]).push(newAsset);
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
      (state.accounts.currentAccounts as any[]).push(newAccount);
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
