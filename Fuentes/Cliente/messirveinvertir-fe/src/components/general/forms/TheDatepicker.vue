<template>
  <ion-item>
    <ion-label>{{ $t(label) }}</ion-label>
    <ion-datetime v-bind="$attrs"></ion-datetime>
  </ion-item>
</template>

<script lang="ts">
export default {
  name: 'TheDatepicker',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
