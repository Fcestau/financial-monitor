<template>
    <ion-item>
      <ion-avatar slot="start">
        <img :src="item.avatar" />
      </ion-avatar>
      <div class="item">
        <ion-label>
          <h3>{{ item.title }}</h3>
        </ion-label>
        <ion-note v-if="showAmount" :color="item.color">
          {{ item.assetType }} {{ item.amount }} <span v-if="showBalance">~ {{ item.balance }}</span>
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
export default ({
    props: {
        item: {
            type: Object,
            required: true
        },
        showAmount: {
            type: Boolean,
            required: true
        },
        actionIcon: {
            type: String,
            required: false
        },
        showBalance: {
            type: Boolean,
            required: false
        },
    },
    methods: {
        action() {
            this.$emit('selectedItem');
        }
    },

})
</script>
<style scoped>
.item {
  width: -webkit-fill-available;
}
</style>
