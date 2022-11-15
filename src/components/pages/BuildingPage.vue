<template>
  <div>
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title"
        >Are you sure you want to delete this building?</span
      >
      <div class="modal_buttons">
        <button
          class="cancel_btn"
          @click="
            showModal = false;
            selectedBuilding = 0;
          "
        >
          cancel
        </button>
        <button class="confirm_btn" @click="deleteBuilding">confirm</button>
      </div>
    </vue-final-modal>
  </div>
  <div>
    <vue-final-modal
      v-model="showForm"
      classes="modal-container"
      content-class="form-content"
    >
      <span class="modal__title">{{ action + " a new building" }}</span>
      <form>
        <div class="input_container">
          <label class="input_label">Building Name</label>
          <input
            required
            type="text"
            id="name"
            class="input"
            placeholder="Add Building Name"
            v-model="name"
          />
        </div>
        <div class="input_container">
          <label class="input_label">Building Address</label>
          <input
            required
            type="text"
            id="name"
            class="input"
            placeholder="Add Building Address"
            v-model="address"
          />
        </div>
        <div class="input_container">
          <label class="input_label">Number of floors</label>
          <input
            required
            type="number"
            id="name"
            class="input"
            placeholder="Add floor count"
            v-model="floors"
          />
        </div>
        <div class="error_msg" v-if="error">
          all the information is required
        </div>
        <div class="modal_buttons">
          <button
            type="button"
            class="cancel_btn"
            @click="
              showForm = false;
              name = '';
              floors = 1;
              address = '';
            "
          >
            cancel
          </button>
          <button type="button" class="confirm_btn" @click="createBuilding">
            {{ action + " building" }}
          </button>
        </div>
      </form>
    </vue-final-modal>
  </div>
  <header class="header">
    <div class="title">Building List</div>
    <div
      class="buildingAdd"
      @click="
        showForm ? (showForm = false) : (showForm = true);
        action = 'create';
      "
    >
      Create a new building
    </div>
  </header>
  <div class="buildingList">
    <BuildingListVue
      v-for="building in buildings"
      :building="building"
      @setId="setId"
      @setselectedBuilding="
        (id) => {
          showModal = true;
          selectedBuilding = id;
        }
      "
      @setAction="
        ({id,Bname,Baddress,floorCount}) => {
          action = 'edit';
          selectedBuilding = id;
          name = Bname;
          address = Baddress;
          floors = floorCount;
          showForm = true;
        }
      "
    />
  </div>
</template>

<script>
import { Building_HOST, API_Header } from "@/config";
import BuildingListVue from "../ListPages/BuildingList.vue";

export default {
  components: {
    BuildingListVue,
  },
  emits: ["setBuilidngId"],
  props: [],
  data: function () {
    return {
      buildings: [],
      showModal: false,
      selectedBuilding: 0,
      showForm: false,
      name: "",
      address: "",
      floors: 1,
      error: false,
      action: "",
    };
  },
  created: async function () {
    this.GetBuildings();
  },
  methods: {
    async GetBuildings() {
      await fetch(Building_HOST, {
        method: "GET",
        headers: API_Header,
      })
        .then((res) => res.json())
        .then((response) => {
          this.buildings = response;
        })
        .catch(() => {});
    },
    async createBuilding() {
      if (this.name != "" && this.address != "" && this.floors > 0) {
        this.error = false;
        await fetch(Building_HOST, {
          method: "POST",
          headers: API_Header,
          body: JSON.stringify({
            id: this.action =="create"? null : this.selectedBuilding,
            name: this.name,
            adresse: this.address,
            floorCount: this.floors,
          }),
        })
          .then((res) => res.json)
          .then((response) => {
            this.GetBuildings();
            this.showForm = false;
            this.name = "";
            this.address = "";
            this.floors = 1;
            this.action = ""
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.error = true;
      }
    },
    async deleteBuilding() {
      await fetch(Building_HOST + `/${this.selectedBuilding}`, {
        method: "DELETE",
        headers: API_Header,
      }).then(() => {
        this.showModal = false;
        this.selectedBuilding = 0;
        this.GetBuildings();
      });
    },
    setId(id) {
      this.$emit("setBuilidngId", id);
    },
    Edit(id) {
      this.sel;
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid grey;
  padding-top: 30px;
}
.title {
  font-weight: bolder;
  font-size: 30px;
}
.buildingList {
  width: 100%;
}
.buildingAdd {
  display: flex;
  border: 1px solid lightgray;
  border-radius: 30px;
  align-items: center;
  padding: 10px;
  font-size: large;
  height: 50px;
}
.buildingAdd:hover {
  background-color: rgb(212, 255, 211);
  cursor: pointer;
}
</style>
<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  width: 40%;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  justify-content: space-evenly;
  text-align: center;
}
.modal__title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.modal_buttons {
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
}
.confirm_btn {
  font-size: 20px;
  width: 150px;
  height: 50px;
  border-radius: 16px;
  border: 1px solid lightgray;
  background-color: rgb(28, 193, 36);
  color: white;
}
.cancel_btn {
  font-size: 20px;
  width: 100px;
  border-radius: 16px;
  border: 1px solid lightgray;
  background-color: rgb(222, 69, 38);
  color: white;
}
::v-deep .form-content {
  width: 40%;
  height: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  align-items: center;
  text-align: center;
}
.input_container {
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 400px;
  margin: 5px;
}
.input_label {
  font-size: large;
}
.input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  border-radius: 10px;
  border: 0.5px solid black;
}
.error_msg {
  color: red;
  opacity: 0.5;
  font-style: italic;
}
</style>
