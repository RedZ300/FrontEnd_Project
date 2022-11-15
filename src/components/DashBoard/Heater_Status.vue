<template>
  <div>
    <apexchart
      width="270"
      type="pie"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { API_Header } from "@/config";

export default {
  name: "heater_status",
  components: {
    apexchart: VueApexCharts,
  },
  props: ["heaters"],
  data: function () {
    return {
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        
        title: {
          text: "ON and OFF heaters",
          align: "center",
        },
        labels: ["ON Heaters", "OFF Heaters"],
        legend: {
          position: "bottom",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      series: [],
    };
  },
  created: async function () {},
  methods: {
    async GetHeaterStatus(heaters) {
      let ON = 0;
      let OFF = 0;
      heaters.forEach((heater) => {
        if (heater.heater_status == "ON") {
          ON++;
        } else {
          OFF++;
        }
      });
      this.series = [ON, OFF];
    },
  },
  watch: {
    heaters(newheaters, oldheaters) {
      if (newheaters.length != 0) {
        this.GetHeaterStatus(newheaters);
      }
    },
  },
};
</script>
