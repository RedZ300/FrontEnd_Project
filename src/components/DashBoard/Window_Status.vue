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
  name: "window_status",
  components: {
    apexchart: VueApexCharts,
  },
  props: ["windows"],
  data: function () {
    return {
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        fill: {
          colors: ["#E2B033", "#DB3E00"],
        },
        title: {
          text: "Closed and Open Windows",
          align: "center",
        },
        legend: {
          position: "bottom",
          markers: {
            fillColors: ["#E2B033", "#DB3E00"],
          },
        },
        labels: ["Open Windows", "Closed Windows"],
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
  created: async function () {

  },
  methods: {
    async GetWindowStatus(windows) {
      let openwindows = 0;
      let closedwindows = 0;
      windows.forEach((window) => {
        if (window.window_status == "OPEN") {
          openwindows++;
        } else {
          closedwindows++;
        }
      });
      this.series = [openwindows, closedwindows];
    },
  },
  watch: {
    windows(newwindows, oldwindows) {
        if(newwindows.length!=0){
            this.GetWindowStatus(newwindows)
        }
    }
  }
};
</script>
