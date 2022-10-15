<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>
          {{ $t('external.link_account') }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p class="ion-text-center">
        {{ $t('external.select_external_account') }}
      </p>
      <ion-list>
        <TheGeneraltem
          v-for="item in items"
          :key="item"
          :item="item"
          :action-icon="chevronForwardOutline"
          @selectedItem="openModal(item)"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script>
import { modalController } from '@ionic/vue';
import TheLinkExternalAccountFormModal from '../business/Modals/TheLinkExternalAccountFormModal.vue';
import { chevronForwardOutline } from 'ionicons/icons';

export default {
  data() {
    return {
      showDialog: false,
      item: { name: this.$t('invertir_online') },
      items: [
        {
          name: 'Invertir Online',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbqQ53w7h-Ns5pWxR4S-Liy-1eTEyDyLSlm7rrAgEXlfU0LsVQ2sZLzzK13W9CqHcDDM&usqp=CAU',
        },
      ],
    };
  },
  setup() {
    return {
      chevronForwardOutline,
    };
  },
  methods: {
    async openModal(item) {
      const modal = await modalController.create({
        component: TheLinkExternalAccountFormModal,
        cssClass: 'my-custom-class',
        componentProps: {
          title: item.name,
          avatar: item.avatar,
        },
      });
      return modal.present();
    },
  },
};
</script>
