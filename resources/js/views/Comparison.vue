<template>
  <div>
    <div class="h-screen bg-gray-900">
      <div class="fixed inset-y-0 z-50 flex w-72 flex-col">
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 border-r border-white px-6 h-full">
          <div class="flex h-16 items-center mt-4" @click="home">
            <img class="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Your Company" />
            <p class="text-white font-bold ml-4">CREX</p>
          </div>
          <nav class="flex flex-1 flex-col">
            <p class="text-white" v-text="subjectProperty.streetAddress"></p>

            <div class="max-h-full flex flex-col overflow-y-scroll pb-12">
              <div class="bg-gray-500 w-full h-48 mt-8" v-for="image in subjectProperty.images">
                <img :src="image.url" class="w-full h-full object-cover" />
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div class="pl-72">
        <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
          <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
            <p class="text-white">Compare Properties</p>
          </div>
          <div class="flex items-center">
            <button type="button" @click="home" class="-m-2.5 p-2.5 text-white">Cancel</button>
            <button type="button" @click="home" class="-m-2.5 ml-4 p-2.5 text-white">Save</button>
          </div>
        </div>

        <main>
          <div class="border-t border-white/10 bg-gray-900 p-12 pt-0 mb-8">
            <div v-for="property in comparisonProperties">
              <div class="max-w-full flex overflow-x-scroll mt-16">
                <div class="mr-8 w-48">
                  <p class="text-white" v-text="property.streetAddress"></p>
                  <p class="text-white" v-text="'$' + property.soldPrice"></p>
                </div>
                <div class="bg-gray-500 w-full h-48 mr-8" v-for="image in property.images">
                  <img :src="image.url" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { EventBus } from "@crex/events/EventBus";

  export default {
      name: 'Comparison',

      computed: {
        ...mapState({
          subjectProperty: state => state.properties.subjectProperty,
          comparisonProperties: state => state.properties.comparisonProperties
        })
      },

      methods: {
        home() {
          this.$router.push('/');
        }
      }
  }
</script>
