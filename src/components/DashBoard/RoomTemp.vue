<template>
  <div>
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import { API_Header } from "@/config";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "room_Temp",
  components: {
    apexchart: VueApexCharts,
  },
  props: ["rooms"],
  data: function () {
    return {
      chartOptions: {
        xaxis: {
          categories: [],
        },
        title: {
          text: "Custom DataLabels",
          align: "center",
          floating: true,
        },
      },
      series: [
        {
          name: "Current_Temperature",
          data: [],
        },
        {
          name: "Target_Temperature",
          data: [],
        },
      ],
    };
  },
  created: async function () {

  },
  methods: {
    async GetRoomTemp(rooms) {
      let newcat = [];
      let target_temp = [];
      let current_temp = [];
      this.rooms.forEach((room) => {
        newcat.push(room.name);
        target_temp.push(room.current_temperature);
        current_temp.push(room.target_temperature);
      });
      this.chartOptions = {
        xaxis: {
          categories: newcat,
        },

        title: {
          text: "Rooms and their temperature",
          align: "center",
        },
      };
      this.series[0].data = target_temp;
      this.series[1].data = current_temp;
    },
  },
  watch: {
    rooms(newrooms, oldrooms) {
        if(newrooms.length!=0){
            this.GetRoomTemp(newrooms)
        }
    }
  }
};
</script>
