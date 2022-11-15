<template>
  <div
    :class="{
      On: heater.heater_status == 'ON',
      Off: heater.heater_status == 'OFF',
    }"
    id="heater_container"
    @dblclick="$emit('changeStatus', heater.id)"
  >
    <div>
      <p class="building_name">{{ heater.name }}</p>
      <p class="building_addresse"></p>
    </div>
    <div>
      <button class="delete_building" v-on:click.stop="$emit('delete',heater.id)">Delete Building</button>
      <button class="Edit_building" v-on:click.stop="edit">
        Edit Building
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "",
  props: ["heater"],
  emits: ["changeStatus", "edit"],
  data: function () {
    return {};
  },
  created: async function () {},
  methods: {
    edit() {
      this.$emit("edit", {
        id: this.heater.id,
        name: this.heater.name,
        status: this.heater.heater_status
      });
    },
  },
};
</script>

<style>
.On {
  border-left: 7px solid green;
}
.Off {
  border-left: 7px solid red;
}
#heater_container {
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
#heater_container:hover {
  background-color: rgb(232, 252, 254);
  cursor: pointer;
}
</style>
