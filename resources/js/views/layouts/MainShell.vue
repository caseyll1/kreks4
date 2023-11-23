<template>
  <div>
    <component :is="layout">
      <router-view></router-view>
    </component>

    <Notification />
  </div>
</template>

<script>
    import Notification from "@crex/components/UI/Notification";

    import { EventBus } from '@crex/events/EventBus';
    import { mapGetters } from "vuex";

    let name = 'main-shell';
    const default_layout = 'default';

    export default {
        name: 'MainShell',

        components: {
          Notification
        },

        created() {
          this.$store.dispatch('setup/initialise');
        },

        computed: {
          layout() {
            return (this.$route.meta.layout || default_layout) + '-layout';
          }
        }
    }
</script>
