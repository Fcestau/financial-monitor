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
            :disabled="currentOperations.length === 0"
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
            :disabled="currentOperations.length === 0"
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
            :disabled="currentOperations.length === 0"
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
            :disabled="currentOperations.length === 0"
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
            :disabled="currentOperations.length === 0"
            @click="filterByPeriod('1_year')"
            color="tertiary"
          >
            <ion-label class="font-bold" color="tertiary">{{
              $t('operations.time_filter.1_year')
            }}</ion-label>
          </ion-chip>
        </ion-col>
      </ion-row>
      <template v-if="currentOperations">
        <template v-for="(item, index) in currentOperations" :key="index">
          <ion-item-divider
            class="divider ion-padding-top ion-padding-bottom"
            v-if="index == 0"
          >
            <ion-label>
              <span>{{ dateLabel(item.timestamp) }}</span>
            </ion-label>
          </ion-item-divider>
          <TheOperationItem
            :item="item"
            :action-icon="trashOutline"
            :can-select="item.account.type === 'Manual'"
            @selectedItem="deleteItem(item)"
          />
          <ion-item-divider
            class="divider ion-padding-top ion-padding-bottom"
            v-if="
              currentOperations.length > index + 1 &&
                dateLabel(currentOperations[index].timestamp) !=
                  dateLabel(currentOperations[index + 1].timestamp)
            "
          >
            <ion-label>
              <span v-if="currentOperations[index + 1]">{{
                dateLabel(currentOperations[index + 1].timestamp)
              }}</span>
            </ion-label>
          </ion-item-divider>
        </template>
      </template>
      <NoInformationCard v-if="currentOperations.length === 0" />
    </ion-content>
  </ion-page>
</template>
<script>
import { trashOutline } from 'ionicons/icons';
import { alertController } from '@ionic/vue';
import Vuex from 'vuex';

export default {
  name: 'OperationsHistory',
  data() {
    return {
      trashOutline,
      period: '1_day',
    };
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
  methods: {
    ...Vuex.mapActions(['deleteOperation']),

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
              this.deleteOperation(item);
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
