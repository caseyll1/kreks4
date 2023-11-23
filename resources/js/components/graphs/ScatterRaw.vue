<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Scatter } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  TimeScale
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  TimeScale
)

export default {
  extends: Scatter,
  data() {
    return {
      shouldUpdateChart: true,
    };
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
    this.shouldUpdateChart = false; // Stop the chart from updating automatically
  },
  watch: {
    chartData: {
      deep: true,
      handler(newData, oldData) {
        if (JSON.stringify(newData) !== JSON.stringify(oldData) && this.shouldUpdateChart) {
          this.updateChart();
        }
      },
    },
    chartOptions: {
      deep: true,
      handler(newOptions, oldOptions) {
        if (JSON.stringify(newOptions) !== JSON.stringify(oldOptions) && this.shouldUpdateChart) {
          this.updateChart();
        }
      },
    },
  },
  methods: {
    updateChart() {
      this.$data._chart.update();
    },
  },
};
</script>
