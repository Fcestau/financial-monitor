<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="false"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card class="balance-card ion-padding">
        <div class="balance">
          <p class="ion-text-left balance-label">
            {{ $t('wallet.total_balance') }}
          </p> 
          <ion-icon class="icon" @click="hideBalance()" :icon="viewIcon"></ion-icon>
        </div>
        <div class="balance-data">
          <template v-if="viewIcon==eye">
            <h3 class="balance-value">$ 9258 </h3>
            <span class="usd-balance"> ≈ 123 USD</span>
          </template>
          <template v-else>
            <h3 class="balance-value">****</h3>
            <span class="usd-balance">****</span>
          </template>
          <ion-icon  class="icon" @click="balanceInfo()" :icon="informationCircle"></ion-icon>
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
            {{ $t('wallet.portfolio')}}
          </ion-label>
          <ion-icon  class="icon" :icon="filter"></ion-icon>
        </ion-item-divider>
        <template v-if="items.length > 0">
          <TheOperationItem
            v-for="(item, index) in items" 
            :key="index"
            :item="item"
            :action-icon="trashOutline"
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
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
export default ({
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
                    data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
                    fill: 'origin',
                    tension: 0.4,
                    label: 'sdf'
                    
                },
                ],
            },
            options: {
                legend: {
                    display: false,
                }
            }
            
        },
        items: [
        {
          title: 'Invertir Online',
          accountType: 'External',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
          assetType: 'USD',
          amount: 300,
          type: 'Venta',
          fecha: '06/05/2021:18:20'

        },
        {
          title: 'Binance',
          accountType: 'External',
          avatar: 'https://bitbase.es/img/coins/BNB.png',
          assetType: 'BTC',
          amount: 300,
          type: 'Compra',
          fecha: '06/05/2021:18:30',
        },
        {
          title: 'Banco Nación',
          accountType: 'External',
          avatar:
            'https://w7.pngwing.com/pngs/169/504/png-transparent-el-banco-de-la-nacion-argentina-bank-transaction-account-bank-blue-text-logo-thumbnail.png',
          assetType: 'ETH',
          amount: 1,
          type: 'Compra',
          fecha: '18/06/2021:16:50'
        },
        {
          title: 'buenbit',
          accountType: 'External',
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          assetType: 'USD',
          amount: 300,
          type: 'Compra',
          fecha: '09/07/2021:12:30'
        },
        {
          title: 'Invertir Online',
          accountType: 'External',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
          assetType: 'USD',
          amount: 300,
          type: 'Venta',
          fecha: '03/07/2021:13:28'

        },
        {
          title: 'Binance',
          accountType: 'External',
          avatar: 'https://bitbase.es/img/coins/BNB.png',
          assetType: 'BTC',
          amount: 300,
          type: 'Compra',
          fecha: '03/07/2021:13:56',
        },
        {
          title: 'Manual',
          accountType: 'Manual',
          avatar:
            'https://w7.pngwing.com/pngs/169/504/png-transparent-el-banco-de-la-nacion-argentina-bank-transaction-account-bank-blue-text-logo-thumbnail.png',
          assetType: 'ETH',
          amount: 1,
          type: 'Compra',
          fecha: '15/07/2021:19:08'
        },
        {
          title: 'buenbit',
          accountType: 'Manual',
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          assetType: 'USD',
          amount: 300,
          type: 'Compra',
          fecha: '15/07/2021:21:40'
        },
      ],
    }
  },
  setup() {
    return {
      eye,
      eyeOff,
      informationCircle,
      filter
    };
  },
  methods: {
    hideBalance() {
      this.viewIcon = this.viewIcon == eye ? eyeOff : eye
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
    }
  }
});
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
