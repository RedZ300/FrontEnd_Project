<template>
  <header class="header">
    <div class="title">{{ RoomName }}</div>
  </header>
  <div class="window_heater_container">
    <div class="window_container">
      <div class="window_header">
        <div class="window_header_upper">
          <div class="window_header_title">Window List</div>
          <button
            class="Edit_building"
            v-on:click.stop="
              () => {
                if (showWForm) {
                  showWForm = false;
                  windowName = '';
                  windowStatus = 'OPEN';
                } else {
                  Waction = 'create';
                  showWForm = true;
                }
              }
            "
          >
            {{ showWForm ? "Cancel" : "Create window" }}
          </button>
        </div>
        <div class="window_header_lower" v-if="showWForm">
          <span class="modal_title">{{ Waction + " a new window" }}</span>
          <form class="window_form">
            <div class="input_container">
              <label class="input_label">Window Name</label>
              <input
                required
                type="text"
                id="name"
                class="input"
                placeholder="Add Window Name"
                v-model="windowName"
              />
            </div>
            <div class="input_container">
              <label class="input_label">Window Status</label>
              <select
                v-model="windowStatus"
                class="input"
                placeholder="Add Window Address"
              >
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <div class="error_msg" v-if="Werror">
              all the information is required'
            </div>
            <button type="button" class="confirm_btn" @click="createOrUpdateW">
              {{ Waction + " a new window" }}
            </button>
          </form>
        </div>
      </div>
      <div class="window_list" v-for="window in windows">
        <WindowListVue
          :window="window"
          @edit="
            ({ id, name, status }) => {
              Waction = 'Edit';
              showWForm = true;
              selectedWindow = id;
              windowName = name;
              windowStatus = status;
            }
          "
          @change-status="changeWstatus"
          @delete="deleteW"
        />
      </div>
    </div>
    <div class="heater_container">
      <div class="window_header">
        <div class="window_header_upper">
          <div class="window_header_title">Heater List</div>
          <button
            class="Edit_building"
            v-on:click.stop="
              () => {
                if (showHForm) {
                  showHForm = false;
                  HeaterName = '';
                  HearterStatus = 'ON';
                } else {
                  Haction = 'create';
                  showHForm = true;
                }
              }
            "
          >
            {{ showHForm ? "Cancel" : "Create heater" }}
          </button>
        </div>
        <div class="window_header_lower" v-if="showHForm">
          <span class="modal_title">{{ Haction + " a new heater" }}</span>
          <form class="window_form">
            <div class="input_container">
              <label class="input_label">Heater Name</label>
              <input
                required
                type="text"
                id="name"
                class="input"
                placeholder="Add Heater Name"
                v-model="HeaterName"
              />
            </div>
            <div class="input_container">
              <label class="input_label">Heater Status</label>
              <select
                v-model="HearterStatus"
                class="input"
                placeholder="Add Heater Status"
              >
                <option value="ON">On</option>
                <option value="OFF">Off</option>
              </select>
            </div>
            <div class="error_msg" v-if="Herror">
              all the information is required'
            </div>
            <button type="button" class="confirm_btn" @click="createOrUpdateH">
              {{ Haction + " a new heater" }}
            </button>
          </form>
        </div>
      </div>
      <div class="window_list" v-for="heater in heaters">
        <HeaterListVue
          :heater="heater"
          @edit="
            ({ id, name, status }) => {
              Haction = 'Edit';
              showHForm = true;
              selectedHeater = id;
              HeaterName = name;
              HearterStatus = status;
            }
          "
          @change-status="changeHstatus"
          @delete="deleteH"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { API_Header, Heater_HOST, Room_HOST, Window_HOST } from "@/config";
import HeaterListVue from "../ListPages/HeaterList.vue";
import WindowListVue from "../ListPages/WindowList.vue";

export default {
  name: "heaterwindow",
  components: {
    HeaterListVue,
    WindowListVue,
  },
  props: ["roomid"],
  data: function () {
    return {
      RoomName: "",
      heaters: [],
      windows: [],
      showWForm: false,
      showHForm: false,
      Waction: "",
      Haction: "",
      windowName: "",
      windowStatus: "OPEN",
      HeaterName: "",
      HearterStatus: "ON",
      selectedWindow: 0,
      selectedHeater: 0,
      Werror: false,
      Herror: false,
    };
  },
  created: async function () {
    this.getRoomName();
    this.getHeaters();
    this.getWindows();
  },
  methods: {
    async getRoomName() {
      await fetch(`${Room_HOST}/${this.roomid}`, {
        method: "GET",
        headers: API_Header,
      })
        .then((res) => res.json())
        .then((response) => {
          this.RoomName = response.name;
        })
        .catch(() => {});
    },
    async getWindows() {
      await fetch(`${Room_HOST}/windows/${this.roomid}`, {
        method: "GET",
        headers: API_Header,
      })
        .then((res) => res.json())
        .then((response) => {
          this.windows = response;
        })
        .catch(() => {});
    },
    async getHeaters() {
      await fetch(`${Room_HOST}/heaters/${this.roomid}`, {
        method: "GET",
        headers: API_Header,
      })
        .then((res) => res.json())
        .then((response) => {
          this.heaters = response;
        })
        .catch(() => {});
    },
    async createOrUpdateW() {
      if (this.windowName != "") {
        this.Werror = false;
        await fetch(Window_HOST, {
          method: "POST",
          headers: API_Header,
          body: JSON.stringify({
            id: this.Waction == "create" ? null : this.selectedWindow,
            name: this.windowName,
            window_status: this.windowStatus,
            roomId: this.roomid,
          }),
        })
          .then((res) => res.json)
          .then((response) => {
            this.getWindows();
            this.showWForm = false;
            this.windowName = "";
            this.windowStatus = "OPEN";
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.Werror = true;
      }
    },
    async changeWstatus(id) {
      let index = this.windows.map((window) => window.id).indexOf(id);
      let window = this.windows[index];
      let window_status = this.windows[index].window_status;
      if (window_status == "OPEN") {
        this.windows[index].window_status = "CLOSED";
      } else {
        this.windows[index].window_status = "OPEN";
      }
      await fetch(Window_HOST, {
        method: "POST",
        headers: API_Header,
        body: JSON.stringify({
          id: id,
          name: window.name,
          window_status: window_status == "OPEN" ? "CLOSED" : "OPEN",
          roomId: this.roomid,
        }),
      });
    },
    async deleteW(id) {
      await fetch(Window_HOST + `/${id}`, {
        method: "DELETE",
        headers: API_Header,
      }).then(() => {
        this.getWindows();
      });
    },
    async createOrUpdateH() {
      if (this.HeaterName != "") {
        this.Herror = false;
        await fetch(Heater_HOST, {
          method: "POST",
          headers: API_Header,
          body: JSON.stringify({
            id: this.Haction == "create" ? null : this.selectedHeater,
            name: this.HeaterName,
            heater_status: this.HearterStatus,
            roomid: this.roomid,
          }),
        })
          .then((res) => res.json)
          .then((response) => {
            this.getHeaters();
            this.showHForm = false;
            this.HeaterName = "";
            this.HearterStatus = "ON";
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.Herror = true;
      }
    },
    async changeHstatus(id) {
      let index = this.heaters.map((heater) => heater.id).indexOf(id);
      let heater = this.heaters[index];
      let heater_status = heater.heater_status;
      if (heater_status == "ON") {
        this.heaters[index].heater_status = "OFF";
      } else {
        this.heaters[index].heater_status = "ON";
      }
      await fetch(Heater_HOST, {
        method: "POST",
        headers: API_Header,
        body: JSON.stringify({
          id: id,
          name: heater.name,
          heater_status: heater_status == "ON" ? "OFF" : "ON",
          roomid: this.roomid,
        }),
      });
    },
    async deleteH(id) {
      await fetch(Heater_HOST + `/${id}`, {
        method: "DELETE",
        headers: API_Header,
      }).then(() => {
        this.getHeaters();
      });
    },
  },
};
</script>

<style>
.window_heater_container {
  display: flex;
  justify-content: space-evenly;
}
.window_container {
  width: 48%;
  background-color: rgb(238, 238, 238, 0.5);
  border: 0.01px solid grey;
  border-radius: 16px;
}
.heater_container {
  width: 48%;
  background-color: rgb(238, 238, 238, 0.5);
  border: 0.01px solid grey;
  border-radius: 16px;
}
.window_header {
  border-bottom: 1px solid grey;
}
.window_header_upper {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
}
.window_header_title {
  font-size: 25px;
  font-weight: bold;
}
.window_header_lower {
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.window_form {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.confirm_btn {
  margin-top: 10px;
  width: 100%;
  background-color: black;
  color: white;
  height: 35px;
  border-radius: 12px;
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
.modal_title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
