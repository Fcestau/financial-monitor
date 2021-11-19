<template>
  <ion-card>
    <ion-item>
      <TheAvatar slot="start" :displayName="item.account.name"> </TheAvatar>
      <ion-card-content>
        <ion-card-subtitle v-if="item.hourly_delta_volume !== 0"
          >El volumen cambio {{ item.hourly_delta_volume }}%</ion-card-subtitle
        >
        <ion-card-subtitle v-if="item.hourly_delta_price !== 0"
          >El precio cambio {{ item.hourly_delta_price }}%</ion-card-subtitle
        >
        <ion-badge style="margin-right:5px" color="danger" mode="ios">{{
         item.asset.name
        }}</ion-badge>
        <ion-badge color="primary" mode="ios">{{ item.frequency }}</ion-badge>
      </ion-card-content>
      <ion-buttons slot="end">
        <ion-button size="small" @click="action()">
          <ion-icon slot="icon-only" :icon="actionIcon"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>
  </ion-card>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    actionIcon: {
      type: String,
      required: false,
    },
    canSelect: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    action() {
      this.$emit('selectedItem');
    },
  },
};
</script>
<style scoped>
.item {
  width: -webkit-fill-available;
}
.small-font {
  font-size: 12px;
}
.display-flex {
  display: flex;
}
.op-action {
  margin-right: 5px;
}
</style>
