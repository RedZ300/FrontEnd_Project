<template>
  <div v-if="selectedroom==0">
    <header class="header">
      <div class="title">{{buildingName}}</div>
    </header>
    <div class="main_container">
      <div class="dashboard">
        <DashBoardVue :buildingId="buildingId" :rooms="rooms" />
      </div>
      <div class="roomList_container">
        <div class="roomList">
          <div class="list_title">Room List</div>
          <RoomListVue
            v-for="floor in floors"
            :floor="floor"
            :rooms="roomsByFloor[floors.indexOf(floor)]"
            @setRoomId="(id) => {selectedroom = id}"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <HeaterWindowPageVue
      :roomid="selectedroom"
    />
  </div>
</template>

<script>
import { API_Header, Building_HOST } from "@/config";
import DashBoardVue from "../DashBoard/DashBoard.vue";
import RoomListVue from "../ListPages/RoomList.vue";
import HeaterWindowPageVue from "./Heater&WindowPage.vue";

export default {
  name: "",
  props: ["buildingId"],
  components: {
    DashBoardVue,
    RoomListVue,
    HeaterWindowPageVue
  },
  data: function () {
    return {
      buildingName: "",
      rooms: [],
      floors: [],
      roomsByFloor: [],
      selectedroom: 0
    };
  },
  created: async function () {
    this.GetRooms();
    this.GetBuildingName()
  },
  methods: {
    async GetBuildingName (){
      await fetch(`${Building_HOST}/${this.buildingId}`, {
        method: "GET",
        headers: API_Header,
      })
      .then(res => res.json())
      .then((response) => {
        this.buildingName = response.name;
      })
      .catch(() => {})
    },
    async GetRooms() {
      await fetch(`${Building_HOST}/rooms/${this.buildingId}`, {
        method: "GET",
        headers: API_Header,
      })
        .then((res) => res.json())
        .then((response) => {
          let floorArr = [];
          let roomArr = [];
          this.rooms = response;
          response.forEach(room => {
            if(floorArr.indexOf(room.floor)==-1){
              floorArr.push(room.floor);
              floorArr.reverse(function(a, b){return a - b});
              roomArr.splice(floorArr.indexOf(room.floor),0,[room]);
            } else {
              roomArr[floorArr.indexOf(room.floor)].push(room);
            }
          });
          this.floors = floorArr;
          this.roomsByFloor = roomArr;
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
.header {
  border-bottom: 1px solid grey;
  text-align: center;
  margin-bottom: 30px;
}
.title {
  color: rgb(109, 32, 182);
  font-weight: bolder;
  font-size: 30px;
  width: 100%;
}
.main_container {
  display: flex;
  flex-direction: row;
}
.dashboard {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.roomList_container {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.roomList{
  width: 90%;
  background-color: rgb(238, 238, 238, 0.5);
  height: 100%;
  border: 0.01px solid grey;
  border-radius: 16px;
}
.list_title{
  color: rgb(109, 32, 182);
  margin: auto;
  margin-bottom: 20px;
  width: 90%;
  text-align: center;
  border-bottom: 1px grey solid;
  font-size: 23px;
  font-weight: bold;
}
</style>
