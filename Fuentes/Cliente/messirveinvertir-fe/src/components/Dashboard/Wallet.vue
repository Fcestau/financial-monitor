<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="false"></ion-menu-button>
          <ion-title>
            {{ $t('wallet.wallet_title_label') }}
          </ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card class="balance-card ion-padding">
        <div class="balance">
          <p class="ion-text-left balance-label">
            {{ $t('wallet.total_balance') }}
          </p>
          <ion-icon
            class="icon"
            @click="hideBalance()"
            :icon="viewIcon"
          ></ion-icon>
        </div>
        <div class="balance-data">
          <template v-if="viewIcon == eye">
            <h3 class="balance-value">$ 9258</h3>
            <span class="usd-balance"> ≈ 123 USD</span>
          </template>
          <template v-else>
            <h3 class="balance-value">****</h3>
            <span class="usd-balance">****</span>
          </template>
          <ion-icon
            class="icon"
            @click="balanceInfo()"
            :icon="informationCircle"
          ></ion-icon>
        </div>
      </ion-card>
      <vue3-chart-js
        :id="lineChart.id"
        :type="lineChart.type"
        :data="lineChart.data"
        class="line-chart ion-padding"
      ></vue3-chart-js>
      <div class="ion-padding">
        <ion-item-divider class="divider">
          <ion-label>
            {{ $t('wallet.portfolio') }}
          </ion-label>
          <ion-icon class="icon" slot="end" :icon="filter"></ion-icon>
        </ion-item-divider>
        <template v-if="currentOperations.length > 0">
          <TheOperationItem
            v-for="(item, index) in currentOperations"
            :key="index"
            :item="item"
            :can-select="false"
          />
        </template>
        <NoInformationCard v-else />
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { eye } from 'ionicons/icons';
import { eyeOff } from 'ionicons/icons';
import { filter } from 'ionicons/icons';
import { informationCircle } from 'ionicons/icons';
import { alertController } from '@ionic/vue';
import Vuex from 'vuex';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
export default {
  components: {
    Vue3ChartJs,
  },
  data() {
    return {
      viewIcon: eye,
      lineChart: {
        id: 'line',
        type: 'line',
        data: {
          labels: ['BNA', 'Binance', 'IOL', 'Otro'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: [
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
              ],
              fill: 'origin',
              tension: 0.4,
              label: 'sdf',
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  setup() {
    return {
      eye,
      eyeOff,
      informationCircle,
      filter,
    };
  },
  methods: {
    hideBalance() {
      this.viewIcon = this.viewIcon == eye ? eyeOff : eye;
    },
    async balanceInfo() {
      const alert = await alertController.create({
        header: this.$t('notice'),
        message: this.$t('wallet.balance_info'),
        buttons: [
          {
            text: this.$t('accept'),
            role: 'cancel',
            cssClass: 'secondary',
          },
        ],
      });
      return alert.present();
    },
  },
  computed: {
    ...Vuex.mapState(['operations']),
    currentOperations() {
      this.operations.currentOperations.forEach((element) => {
        if (element.type === 'Compra') {
          element.color = 'success';
        } else {
          element.color = 'danger';
        }
      });

      return this.operations.currentOperations;
    },
  },
};
</script>
<style scoped>
.line-chart {
  position: relative;
  height: auto !important;
  width: fill !important;
}
.balance-label {
  font-size: 12px;
  color: gray;
}
.balance-value {
  font-size: 22px;
  font-weight: bold;
  margin: 0px;
}
.balance-data {
  display: flex;
}
.usd-balance {
  align-self: center;
  margin-left: 5px;
}
.icon {
  margin-left: 5px;
  align-self: center;
}
.balance {
  display: inline-flex;
}
.balance-card {
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  margin-bottom: 0px;
}
.portafolio-label {
  margin-top: 0px;
  font-weight: bold;
}
.divider {
  border-radius: 5px;
  margin-bottom: 15px;
}
</style>
