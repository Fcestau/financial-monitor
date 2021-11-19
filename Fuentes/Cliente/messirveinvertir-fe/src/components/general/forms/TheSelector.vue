<template>
  <ion-item>
    <ion-label v-if="label">{{ $t(label) }}</ion-label>
    <ion-select v-bind="$attrs">
      <ion-select-option
        v-for="value in values"
        :key="value"
        :value="value.value"
        >{{ value.displayName }}</ion-select-option
      >
    </ion-select>
  </ion-item>
</template>

<script lang="ts">
export default {
  name: 'TheSelector',
  props: {
    label: {
      type: String,
      required: false,
    },
    values: {
      type: Array,
      required: true,
    },
  },
};
</script>
