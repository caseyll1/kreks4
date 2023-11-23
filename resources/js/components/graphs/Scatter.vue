<template>
  <Scatter
    ref="scatterChart"
    :chart-options="chartOptions"
    :chart-data="chartData"
    @click="handleChartClick"
  />
</template>

<script>
import { Scatter } from 'vue-chartjs/legacy';
import { enUS } from "date-fns/locale";
import { mapState } from 'vuex';

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
  name: 'ScatterChart',
  components: {
    Scatter
  },
  methods: {
    handleChartClick(event) {
      const chart = this.$refs.scatterChart
      const activePoints = chart.getElementsAtEvent(event)
      if (activePoints.length > 0) {
        const clickedDatasetIndex = activePoints[0]._datasetIndex
        const clickedDataIndex = activePoints[0]._index
        const clickedData = chart.chartData.datasets[clickedDatasetIndex].data[clickedDataIndex]
      }
    }
  },
  computed: {
    ...mapState({
      properties: state => state.properties.properties
    }),
    chartData() {
      return {
        datasets: [
          {
            label: "properties",
            data: this.properties
              .filter((property) => {
                const vqca = property?.VQCA;

                if (this.isSliderFilter) {
                  let viewPropertyValue = parseInt(property?.v);
                  let qualityPropertyValue = parseInt(property?.q);
                  let conditionPropertyValue = parseInt(property?.c);
                  let amenitiesPropertyValue = parseInt(property?.a);
                  let threshold =
                    Math.abs(viewPropertyValue - parseInt(searchView)) /
                    viewPropertyValue;

                  let viewResult = parseInt(searchView) === viewPropertyValue;
                  let qualityResult =
                    parseInt(searchQuality) === qualityPropertyValue;
                  let conditionResult =
                    parseInt(searchCondition) === conditionPropertyValue;
                  let amenitiesResult =
                    parseInt(searchAmenities) === amenitiesPropertyValue;

                  return (
                    viewResult ||
                    qualityResult ||
                    conditionResult ||
                    amenitiesResult
                  );
                }
                return true;
              })
              .map((d, i) => ({
                x: d.soldPrice,
                y: d.yTotal,
                title: d.streetAddress,
                streetAddress: d.streetAddress,
                postalCity: d.postalCity,
                state: d.state,
                MLS: d.MLS,
                opinionTotal: d.opinionTotal,
                YTotal: d.yTotal,
                soldPrice: d.soldPrice,
                zipCode: d.zipCode,
                date: d.date,
                DO: d.difference_in_opinion,
                v: d.v,
                q: d.q,
                c: d.c,
                a: d.a,
                id: d.id,
                images: d.images
              })),
              borderColor: (context) => {
                const property = this.properties[context.dataIndex];
                if (property?.difference_in_opinion) {
                  return "white";
                } else {
                  return "yellow";
                }
              },
              pointRadius: () => {
                return 6;
              }
            }
          ]
      }
    }
  },
  data() {
    return {
      isSliderFilter: false,
      zipCode: '',
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              beginAtZero: true
            }
          }
        },
        onClick: (event, elements, chart) => {
          if (elements[0]) {
             const i = elements[0].index;
             let property = chart.data.datasets[0].data[i];
             this.$store.dispatch('properties/selectProperty', property);
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (item, context) {
                let label = "";

                label += item.raw.x;
                label += "\n ";
                label += item.raw.y;

                return label;
              },

              beforeBody: function (item, context) {
                let labelDate = "Title: " + item[0].raw.title;

                return [labelDate];
              },

              afterBody: function (item, context) {
                let labelDate = "Date: " + item[0].raw.x;
                let labelPrice = "Price" + item[0].raw.y;

                let isReference =
                  (!!item[0].raw.DO && "Reference Property") || "Subject Property";
                return [labelDate, labelPrice, isReference];
              },

              labelColor: function (context) {
                return {
                  borderColor: "rgb(0, 0, 255)",
                  backgroundColor: "rgb(255, 0, 0)",
                  borderWidth: 2,
                  borderDash: [2, 2],
                  borderRadius: 2,
                };
              },
              labelTextColor: function (context) {
                return "white";
              },
              labelPointStyle: function (context) {
                return {
                  pointStyle: "triangle",
                  rotation: 0,
                };
              },
              title: function (context) {
                return "Details";
              }
            }
          }
        }
      }
    }
  }
}
</script>
