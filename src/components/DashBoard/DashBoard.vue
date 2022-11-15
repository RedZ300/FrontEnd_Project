<template>
    <div class="box1">
      <window_status :windows="windows"/>
      <Heater_StatusVue :heaters="heaters"/>
    </div>
    <div class="divider"></div>
    <div class="box2">
      <RoomTempVue :rooms="rooms"/>
    </div>
</template>
  
<script>
  import {API_Header} from '@/config'
  import window_status from './Window_Status.vue'
  import Heater_StatusVue from "./Heater_Status.vue";
  import RoomTempVue from "./RoomTemp.vue";
  
  export default {
    components: {
      window_status,
      Heater_StatusVue,
      RoomTempVue
    },
    props: ["buildingId","rooms"],
    data: function () {
      return {
        heaters: [],
        windows: []
      };
    },
    created: async function() {
      this.GetWindows();
      this.GetHeaters();  
    },
    methods:{
      async GetWindows() {
        await fetch(
          `/api/buildings/windows/${this.buildingId}`,  {
            method: "GET",
            headers: API_Header
          }
        )
        .then(res => res.json())
        .then((response) => {
          this.windows = response;
        })
        .catch(() => {})
      },
      async GetHeaters() {
        await fetch(
          `/api/buildings/heaters/${this.buildingId}`,  {
            method: "GET",
            headers: API_Header
          }
        )
        .then(res => res.json())
        .then((response) => {
          this.heaters = response;
        })
        .catch(() => {})
      }
    }
  };
</script>

<style>

.box1 {
  width: "100%";
    display: flex;
    flex-direction: row;
}
.divider {
  border-bottom: solid lightgray 2px;
  height: 1px;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
  