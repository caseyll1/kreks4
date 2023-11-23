<template>
  <div>
    <div class="h-screen bg-gray-900">
      <div class="fixed inset-y-0 z-50 flex w-72 flex-col">
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 border-r border-white px-6 h-full">
          <div class="flex h-16 shrink-0 items-center">
            <img class="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Your Company" />
            <p class="text-white font-bold ml-4">CREX</p>
          </div>
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <li>
                    <p class="text-white">Subject Property</p>
                    <a v-if="subjectProperty.hasOwnProperty('id')" @click="clearSubjectProperty" href="#" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 py-1 pl-0 text-sm leading-6 font-semibold"
                       v-text="subjectProperty.streetAddress"
                    ></a>
                    <a v-else href="#" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 pl-0 text-sm leading-6 font-semibold">
                      Please select
                    </a>
                  </li>

                  <li class="pt-6"  v-if="subjectProperty.hasOwnProperty('id')">
                    <p class="text-white">Comparison Property</p>
                    <a v-if="comparisonProperty.hasOwnProperty('id')" @click="clearComparisonProperty" href="#" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 py-1 pl-0 text-sm leading-6 font-semibold"
                       v-text="comparisonProperty.streetAddress"
                    ></a>
                    <a v-else href="#" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 pl-0 text-sm leading-6 font-semibold">
                      Please select
                    </a>
                  </li>

                  <li class="pt-6" v-if="subjectProperty.hasOwnProperty('id') && comparisonProperty.hasOwnProperty('id')">
                    <button type="button" class="rounded-md bg-blue-500 px-3 py-2 w-full text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="compare">Compare</button>
                 </li>
                </ul>
              </li>

              <li onClick={logout} class="-mx-6 mt-auto">
                <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
                  <span aria-hidden="true">Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="pl-72">
        <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
          <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form class="flex flex-1" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div class="relative w-full">
                <svg class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                </svg>
                <input id="search-field" @input="is_typing = true" v-model="search_query" class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm" placeholder="Search by zip code..." type="search" name="search" />
              </div>
            </form>
          </div>
          <button type="button" class="-m-2.5 p-2.5 text-white" @click="showSlideover">
            <span class="sr-only">Open sidebar</span>
            <FilterIcon class="h-5 w-5 text-white" />
          </button>
        </div>

        <main>
          <div class="border-t border-white/10 p-12 pb-0 mb-8">
            <ScatterChart v-if="properties.length > 0" />
          </div>
        </main>
      </div>
    </div>

    <Slideover :showing="show_slideover" v-on:close="closeSlideover" />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { EventBus } from "@crex/events/EventBus";
  import _ from 'underscore';

  import ScatterChart from '@crex/components/graphs/Scatter';
  import FilterIcon from '@crex/icons/Filter';
  import Slideover from '@crex/components/UI/Slideover';

  export default {
      name: 'MainShell',

      data() {
        return {
          show_slideover: false,
          is_typing: false,
          search_query: ''
        }
      },

      mounted() {
        this.search_query = this.zipCode;
        this.$store.dispatch('properties/get');
      },

      components: {
        ScatterChart,
        FilterIcon,
        Slideover
      },

      watch: {
        search_query: _.debounce(function() {
          this.is_typing = false;
        }, 1000),
        is_typing: function(value) {
          if (!value) {
            this.$store.commit('properties/setZipCode', this.search_query);
            this.$store.dispatch('properties/get');
          }
        }
      },

      computed: {
        ...mapState({
          properties: state => state.properties.properties,
          subjectProperty: state => state.properties.subjectProperty,
          comparisonProperty: state => state.properties.comparisonProperty,
          zipCode: state => state.properties.zip_code
        })
      },

      methods: {
        showSlideover() {
          this.show_slideover = true;
        },
        closeSlideover() {
          this.show_slideover = false;
        },
        compare() {
          this.$router.push('/comparison');
        },
        clearSubjectProperty() {
          this.$store.dispatch('properties/clearSubjectProperty');
        },
        clearComparisonProperty() {
          this.$store.dispatch('properties/clearComparisonProperty');
        }
      }
  }
</script>
