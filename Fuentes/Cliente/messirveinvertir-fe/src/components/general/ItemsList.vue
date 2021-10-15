<template>
  <ion-list>
    <ion-item v-for="item in items" :key="item">
      <ion-avatar slot="start">
        <img :src="item.avatar" />
      </ion-avatar>
      <ion-content>
        <ion-label>
          <h2>{{ item.title }}</h2>
        </ion-label>
        <ion-note :color="item.color">
          {{ item.assetType }} {{ item.amount }}
        </ion-note>
      </ion-content>
      <ion-buttons>
        <ion-button size="small" @click="deleteItem(item)">
          <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>
  </ion-list>
</template>
<script>
import { trashOutline } from 'ionicons/icons';

export default {
  name: 'ItemsList',
  props: ['items'],
  methods: {
    deleteItem(item) {
      this.$emit('deleteItem', item);
    },
  },
  setup() {
    return {
      trashOutline,
    };
  },
  mounted() {
    this.items.forEach((element) => {
      if (element.amount > 0) {
        element.color = 'success';
      } else {
        element.color = 'danger';
      }
    });
  },
};
</script>
