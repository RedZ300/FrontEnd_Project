<template>
  <div
    :class="{
      Open: window.window_status == 'OPEN',
      Closed: window.window_status == 'CLOSED',
    }"
    id="window_container"
    @dblclick="$emit('changeStatus', window.id)"
  >
    <div>
      <p class="building_name">{{ window.name }}</p>
      <p class="building_addresse"></p>
    </div>
    <div>
      <button class="delete_building" v-on:click.stop="$emit('delete',window.id)">Delete Building</button>
      <button class="Edit_building" v-on:click.stop="edit">
        Edit Building
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "",
  components: {},
  props: ["window"],
  emits: ["changeStatus", "edit","delete"],
  data: function () {
    return {};
  },
  created: async function () {},
  methods: {
    edit() {
      this.$emit("edit", {
        id: this.window.id,
        name: this.window.name,
        status: this.window.window_status
      });
    },
  },
};
</script>
<style>
.Open {
  border-left: 7px solid green;
}
.Closed {
  border-left: 7px solid red;
}
#window_container {
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
#window_container:hover {
  background-color: rgb(232, 252, 254);
  cursor: pointer;
}
</style>
