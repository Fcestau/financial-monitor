<template>
  <ion-item>
    <TheAvatar slot="start" :displayName="item.account.name"> </TheAvatar>
    <div class="item">
      <ion-label>
        <h3>{{ item.account.name }}</h3>
      </ion-label>
      <div class="display-flex">
        <ion-badge class="op-action" :color="item.color">{{
          item.type
        }}</ion-badge>
        <ion-note>
          <span class="small-font"
            >{{ item.asset.name }} {{ item.quantity }}</span
          >
        </ion-note>
      </div>
    </div>
    <ion-buttons>
      <ion-button v-if="canSelect" size="small" @click="action()">
        <ion-icon slot="icon-only" :icon="actionIcon"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-item>
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
