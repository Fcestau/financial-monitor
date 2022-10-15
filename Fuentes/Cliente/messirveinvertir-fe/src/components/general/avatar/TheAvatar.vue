<template>
  <ion-avatar :slot="slot" class="avatar">
    <div class="initials">
      {{ getInitials }}
    </div>
  </ion-avatar>
</template>
<script>
export default {
  props: {
    displayName: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      initials: '',
    };
  },
  computed: {
    getInitials() {
      let initials = '';
      if (this.displayName) {
        const names = this.displayName.split(' ');
        initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
          initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
      }
      return initials;
    },
  },
};
</script>
<style scoped>
.avatar {
  background-color: black;
}
.initials {
  width: 100%;
  color: white;
  display: flex;
  font-size: 100%;
  align-content: center;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;
}
</style>
