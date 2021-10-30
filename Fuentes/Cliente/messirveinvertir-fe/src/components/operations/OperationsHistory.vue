<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false" />
      </ion-buttons>
      <ion-title class="c-title">
        {{ $t('operations.operations_history') }}
      </ion-title>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <TheButton
        router-link="operation-creator"
        expand="block"
        inner-text="operations.new_operation"
      />
      <ion-row class="ion-text-center ion-margin-top ion-margin-bottom">
        <ion-col>
          <ion-chip
            :disabled="noItems"
            @click="filterByPeriod('1_day')"
            color="tertiary"
          >
            <ion-label class="font-bold" color="tertiary">{{
              $t('operations.time_filter.1_day')
            }}</ion-label>
          </ion-chip>
        </ion-col>
        <ion-col>
          <ion-chip
            :disabled="noItems"
            @click="filterByPeriod('1_week')"
            color="tertiary"
          >
            <ion-label class="font-bold" color="tertiary">{{
              $t('operations.time_filter.1_week')
            }}</ion-label>
          </ion-chip>
        </ion-col>
        <ion-col>
          <ion-chip
            :disabled="noItems"
            @click="filterByPeriod('1_month')"
            color="tertiary"
          >
            <ion-label class="font-bold" color="tertiary">{{
              $t('operations.time_filter.1_month')
            }}</ion-label>
          </ion-chip>
        </ion-col>
        <ion-col>
          <ion-chip
            :disabled="noItems"
            @click="filterByPeriod('3_months')"
            color="tertiary"
          >
            <ion-label class="font-bold" color="tertiary">{{
              $t('operations.time_filter.3_months')
            }}</ion-label>
          </ion-chip>
        </ion-col>
        <ion-col>
          <ion-chip
            :disabled="noItems"
            @click="filterByPeriod('1_year')"
            color="tertiary"
          >
            <ion-label class="font-bold" color="tertiary">{{
              $t('operations.time_filter.1_year')
            }}</ion-label>
          </ion-chip>
        </ion-col>
      </ion-row>
      <template v-if="items">
        <template v-for="(item, index) in items" :key="index">
          <ion-item-divider
            class="divider ion-padding-top ion-padding-bottom"
            v-if="index == 0"
          >
            <ion-label>
              <span>{{ dateLabel(item.fecha) }}</span>
            </ion-label>
          </ion-item-divider>
          <TheOperationItem
            :item="item"
            :action-icon="trashOutline"
            :can-select="item.accountType === 'Manual'"
            @selectedItem="deleteItem(item)"
          />
          <ion-item-divider
            class="divider ion-padding-top ion-padding-bottom"
            v-if="
              items.length > index + 1 &&
                dateLabel(items[index].fecha) !=
                  dateLabel(items[index + 1].fecha)
            "
          >
            <ion-label>
              <span v-if="items[index + 1]">{{
                dateLabel(items[index + 1].fecha)
              }}</span>
            </ion-label>
          </ion-item-divider>
        </template>
      </template>
      <NoInformationCard v-if="noItems" />
    </ion-content>
  </ion-page>
</template>
<script>
import { trashOutline } from 'ionicons/icons';
import { alertController } from '@ionic/vue';
export default {
  name: 'OperationsHistory',
  setup() {
    return {
      trashOutline,
    };
  },
  data() {
    return {
      period: '1_day',
      items: [
        {
          title: 'Invertir Online',
          accountType: 'External',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
          assetType: 'USD',
          amount: 300,
          type: 'Venta',
          fecha: '06/05/2021:18:20',
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
          fecha: '18/06/2021:16:50',
        },
        {
          title: 'buenbit',
          accountType: 'External',
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          assetType: 'USD',
          amount: 300,
          type: 'Compra',
          fecha: '09/07/2021:12:30',
        },
        {
          title: 'Invertir Online',
          accountType: 'External',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
          assetType: 'USD',
          amount: 300,
          type: 'Venta',
          fecha: '03/07/2021:13:28',
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
          fecha: '15/07/2021:19:08',
        },
        {
          title: 'buenbit',
          accountType: 'Manual',
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          assetType: 'USD',
          amount: 300,
          type: 'Compra',
          fecha: '15/07/2021:21:40',
        },
      ],
    };
  },
  computed: {
    noItems() {
      return this.items.length === 0;
    },
  },
  mounted() {
    this.items.forEach((element) => {
      if (element.type === 'Compra') {
        element.color = 'success';
      } else {
        element.color = 'danger';
      }
    });
  },
  methods: {
    dateLabel(date) {
      //TODO: realizar el formateo correcto
      return this.period === '1_day' ? date.slice(11, 16) : date.slice(0, 10);
    },
    filterByPeriod(value) {
      this.period = value;
    },
    deleteItem(item) {
      this.deleteItemAlertConfirm(item);
    },
    async deleteItemAlertConfirm(item) {
      const alert = await alertController.create({
        header: this.$t('operations.delete_operation'),
        message: this.$t('operations.sure_delete_opeartion_ask'),
        buttons: [
          {
            text: this.$t('cancel'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            },
          },
          {
            text: this.$t('accept'),
            handler: () => {
              //TODO: hacer logica correspondiente a utilizar el eliminar operacion del backend
              const index = this.items.findIndex((itemT) => itemT === item);
              this.items.splice(index, 1);
            },
          },
        ],
      });
      return alert.present();
    },
  },
};
</script>
<style scoped>
.c-title {
  width: fit-content;
}
.font-bold {
  font-weight: bold;
}
.divider {
  background-color: transparent;
  font-weight: bold;
  font-size: 14px;
  color: grey;
  display: grid;
  opacity: 0.6;
  justify-content: center;
}
</style>
