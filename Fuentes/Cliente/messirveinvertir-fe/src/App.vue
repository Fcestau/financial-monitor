<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FCM } from "@capacitor-community/fcm";
export default defineComponent({
  name: 'App',
  mounted() {
    // Get FCM token instead the APN one returned by Capacitor
    FCM.subscribeTo({ topic: "test" })
      .then(() => alert(`subscribed to topic`))
      .catch((err) => console.log(err));
  },
}
);
</script>
