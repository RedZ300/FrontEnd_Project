<template>
  <div class="container">
    <div class="content_container">
      <template v-if="BuilidngId != 0">
        <RoomPageVue :buildingId="BuilidngId" />
      </template>
      <template v-else>
        <BuildingPage @setBuilidngId="setId" />
      </template>
    </div>
  </div>
</template>

<script>
import BuildingPageVue from './BuildingPage.vue';
import RoomPageVue from './RoomPage.vue';

export default {
  components: {
    BuildingPage: BuildingPageVue,
    RoomPageVue,
  },
  data: function () {
    return {
      BuilidngId: 0,
       setId: (id) => {
        this.BuilidngId = id;
      }
    };
  },
  setup() {
  },
  method: {},
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: "90%";
}
.content_container {
  margin-left: auto;
  margin-right: auto;
}
</style>
