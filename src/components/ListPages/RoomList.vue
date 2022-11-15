<template>
  <div class="floor_container">
    <div class="floor_title_container">
      <div class="floor_title">Floor number {{ floor }}</div>
      <div class="floor_divider"></div>
    </div>
    <div class="room_list">
      <div v-for="room in rooms" class="room">
        <div @click="setId(room.id)">
          {{room.name}}
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "roomlist",
  components: {},
  props: ["floor", "rooms"],
  emits: ["setRoomId"],
  data: function () {
    return {};
  },
  created: async function () {
  },
  methods: {
    setId(id){
      this.$emit("setRoomId",id)
    }
  },
};
</script>

<style>
.floor_container {
  width: 100%;
}
.floor_title_container {
  color: rgb(88, 88, 206);
  font-size: 20px;
  display: flex;
  font-weight: bolder;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 5px;
}
.floor_title {
  font-style: italic;
}
.floor_divider {
  border-bottom: solid lightgray 2px;
  height: 1px;
  width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.room_list {
  display: flex;
  align-items: center;
  align-content: center;
  padding: 8px;
  overflow-x: scroll;
}
.room {
  width: 100px;
  height: 60px;
  border: 0.5px solid black;
  background-color: white;
  border-radius: 12px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: larger;
}
.room:hover{
  background-color: aquamarine;
  cursor: pointer;
}
</style>
