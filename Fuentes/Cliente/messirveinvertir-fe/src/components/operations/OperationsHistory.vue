<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false" />
      </ion-buttons>
      <ion-title class="c-title"> {{ $t('operations.operations_history') }} </ion-title>
    </ion-toolbar>
    <ion-content class="ion-padding">
     <TheButton expand="block" inner-text="operations.new_operation" />
     <ion-row class="ion-text-center ion-margin-top ion-margin-bottom">
         <ion-col>
            <ion-badge color="tertiary">{{ $t('operations.time_filter.1_day') }}</ion-badge>
         </ion-col>
         <ion-col>
            <ion-badge color="tertiary">{{ $t('operations.time_filter.1_week') }}</ion-badge>
         </ion-col>
         <ion-col>
            <ion-badge color="tertiary">{{ $t('operations.time_filter.1_month') }}</ion-badge>
         </ion-col>
         <ion-col>
            <ion-badge color="tertiary">{{ $t('operations.time_filter.3_months') }}</ion-badge>
         </ion-col>
         <ion-col>
            <ion-badge color="tertiary">{{ $t('operations.time_filter.1_year') }}</ion-badge>
         </ion-col>
     </ion-row>
     <template  v-if="items">
        <TheGeneraltem
            v-for="item in items"
            :key="item"
            :item="item"
            :action-icon="trashOutline"
            :show-amount="true"
            :show-balance="true"
        />
     </template>
     <NoInformationCard v-else />
    </ion-content>
  </ion-page>
</template>
<script>
import { trashOutline } from 'ionicons/icons';
export default {
  name: 'OperationsHistory',
  setup() {
    return {
      trashOutline,
    };
  },
  data() {
    return {
      items: [
        {
          title: 'Invertir Online',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
          assetType: 'USD',
          amount: -300,
          balance: 1234

        },
        {
          title: 'Binance',
          avatar: 'https://bitbase.es/img/coins/BNB.png',
          assetType: 'BTC',
          amount: 300,
          balance: 5343
        },
        {
          title: 'Banco Nación',
          avatar:
            'https://w7.pngwing.com/pngs/169/504/png-transparent-el-banco-de-la-nacion-argentina-bank-transaction-account-bank-blue-text-logo-thumbnail.png',
          assetType: 'ETH',
          amount: 1,
          balance: 23234
        },
        {
          title: 'buenbit',
          avatar:
            'https://play-lh.googleusercontent.com/FMYg7BS3gM5hANcoHJ45vB_2yOV_na6EJUFTxYq8CuZbgpB2qqCr7D9zx3SJo8m1xTmb',
          assetType: 'USD',
          amount: 300,
          balance: 17682
        },
      ],
    };
  },
}
</script>
<style scoped>
.c-title {
    width: fit-content;
}
</style>