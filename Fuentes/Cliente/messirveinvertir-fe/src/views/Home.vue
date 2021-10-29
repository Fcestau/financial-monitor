<template>
  <ion-page>
    <Menu
      user-name="Rodrigo Mignola"
      avatar-url="https://us.123rf.com/450wm/deagreez/deagreez1909/deagreez190903983/130021023-soy-el-mejor-foto-de-chico-incre%C3%ADble-que-indica-los-dedos-pulgar-sobre-s%C3%AD-mismo-usar-camisa-a-cuadro.jpg?ver=6"
      @logout="logout">
    </Menu>
  </ion-page>
</template>

<script lang="ts">

export default {
  name: "Home",
  methods: {
    logout() {
      //TODO: incluir funcion de Logout vinculada con BackEnd 
      console.log("se esta ejecutando en Home view");
    },
  },
};
</script>
