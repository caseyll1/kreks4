<template>
  <div class="relative z-50" v-if="showing" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <!--
      Background backdrop, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" :class="{ 'opacity-0' : !showing, 'opacity-100' : showing }"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <!--
            Slide-over panel, show/hide based on slide-over state.

            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          -->
          <div class="transform transition ease-in-out duration-500 sm:duration-700 pointer-events-auto relative w-screen max-w-md " :class="{ 'w-0' : !showing, 'w-full' : showing }">
            <!--
              Close button, show/hide based on slide-over state.

              Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0"
            -->
            <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4" :class="{ 'opacity-0' : !showing, 'opacity-100' : showing }">
              <button type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="close()">
                <span class="sr-only">Close panel</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="flex h-full flex-col overflow-y-scroll bg-gray-900 py-6 shadow-xl">
              <div class="px-4 sm:px-6">
                <h2 class="text-base font-semibold leading-6 text-white">Filter properties</h2>
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                <!-- Your content -->
                <div class="flex flex-1 flex-col">
                  <div>
                    <div>
                      <label for="dateFrom" class="block text-sm font-medium leading-6 text-white">Sold date from</label>
                      <div class="mt-2">
                        <input type="date" name="dateFrom" v-model="dateFrom" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      </div>
                    </div>

                    <div class="mt-6">
                      <label for="dateTo" class="block text-sm font-medium leading-6 text-white">Sold date to</label>
                      <div class="mt-2">
                        <input type="date" name="dateTo" v-model="dateTo" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      </div>
                    </div>
                  </div>

                  <div class="mt-6">
                    <div>
                      <label for="soldFrom" class="block text-sm font-medium leading-6 text-white">Min sold price</label>
                      <div class="mt-2">
                        <input type="number" name="soldFrom" v-model="soldFrom" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      </div>
                    </div>

                    <div class="mt-6">
                      <label for="soldTo" class="block text-sm font-medium leading-6 text-white">Max sold price</label>
                      <div class="mt-2">
                        <input type="number" name="soldTo" v-model="soldTo" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      </div>
                    </div>
                  </div>

                  <button type="button" @click="compare" class="mt-6 rounded-md bg-blue-500 px-3 py-2 w-full text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Filter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
      props: ['showing'],
      computed: {
        ...mapState({
          date_from: state => state.properties.date_from,
          date_to: state => state.properties.date_to,
          sold_from: state => state.properties.sold_from,
          sold_to: state => state.properties.sold_to
        }),
        dateFrom: {
          get () {
            return this.date_from;
          },
          set (value) {
            this.$store.commit('properties/setDateFrom', value);
          }
        },
        dateTo: {
          get () {
            return this.date_to;
          },
          set (value) {
            this.$store.commit('properties/setDateTo', value);
          }
        },
        soldFrom: {
          get () {
            return this.sold_from;
          },
          set (value) {
            this.$store.commit('properties/setSoldFrom', value);
          }
        },
        soldTo: {
          get () {
            return this.sold_to;
          },
          set (value) {
            this.$store.commit('properties/setSoldTo', value);
          }
        }
      },
      methods: {
        close() {
          this.$emit('close');
        },
        compare() {
          let self = this;
          this.$store.dispatch('properties/get', () => {
            self.$emit('close');
          })
        }
      }
  }
</script>
