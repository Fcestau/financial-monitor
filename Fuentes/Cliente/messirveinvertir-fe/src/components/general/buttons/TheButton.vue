<template>
    <ion-button 
        v-bind="$attrs" 
        :disabled="disabled" 
        shape="round"
        color="tertiary"
    >
        <!-- <ion-icon :icon="icon"></ion-icon> -->
        {{ $t(innerText) }}
    </ion-button>
</template>
<script>
export default ({
    props: {
        innerText: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
})
</script>
<style scoped>

</style>