<template>
  <ion-item>
    <TheAvatar slot="start" :displayName="item.name"> </TheAvatar>
    <div class="item">
      <ion-label>
        <h3>{{ item.name }}</h3>
      </ion-label>
      <ion-note :color="item.color">
        <span class="small-font">{{ item.assetType }} {{ item.balance }}</span>
      </ion-note>
    </div>
    <ion-buttons>
      <ion-button size="small" @click="action()">
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
</style>
