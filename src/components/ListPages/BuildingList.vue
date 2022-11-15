<template>
  <div class="building_container" @click="$emit('setId', this.building.id)">
    <div>
      <p class="building_name">{{ building.name.replace("Ã‰", "é") }}</p>
      <p class="building_addresse">
        {{
          building.adresse.replace("Ã‰", "é") +
          " - " +
          building.floorCount +
          " floors"
        }}
      </p>
    </div>
    <div>
      <button class="delete_building" v-on:click.stop="$emit('setselectedBuilding', this.building.id);">
        Delete Building
      </button>
      <button class="Edit_building" v-on:click.stop="edit">
        Edit Building
      </button>
    </div>
  </div>
</template>

<script>
import { API_Header } from "@/config";

export default {
  name: "buildingList",
  components: {},
  props: ["building"],
  emits: ["setId", "setselectedBuilding", "setAction"],
  data: function () {
    return {};
  },
  created: async function () {},
  methods: {
    edit() {
      console.log(this.building.adresse.replace("Ã‰", "é"))
      this.$emit("setAction", {
        id: this.building.id,
        Bname: this.building.name.replace("Ã‰", "é") ,
        Baddress: this.building.adresse.replace("Ã‰", "é"),
        floorCount: this.building.floorCount
      });
    },
  },
};
</script>

<style>
.building_container {
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 0px;
  padding-top: 5px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  text-align: start;
}
.building_container:hover {
  background-color: rgb(232, 252, 254);
  cursor: pointer;
}
.building_name {
  font-size: large;
  font-weight: bold;
  font-style: italic;
}
.building_addresse {
  font-size: medium;
  font-weight: lighter;
  color: darkgray;
}
.delete_building {
  font-weight: bold;
  height: 50px;
  border-radius: 16px;
  border: 1px solid lightgray;
  background-color: rgb(222, 69, 38);
  color: white;
}
.Edit_building {
  font-weight: bold;
  height: 50px;
  border-radius: 16px;
  border: 1px solid lightgray;
  background-color: rgb(38, 118, 222);
  color: white;
}
</style>
