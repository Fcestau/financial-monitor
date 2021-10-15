<template>
    <ion-item class="input-text">
        <ion-label color="primary"  position="floating" >{{ $t(label)}}</ion-label>
        <ion-input v-bind="$attrs"></ion-input>
    </ion-item>
</template>
<script>
export default ({
    props: {
        label: {
            type: String,
            required: true
        }
    }
})
</script>
<style scoped>
.input-text {
  font-size:14px;
}
</style>