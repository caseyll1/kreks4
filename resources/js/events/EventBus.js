/**
 * This is the events bus that will be used throughout the snapp components
 *
 * Trigger an event like:
 * EventBus.$emit('i-am-en-event', this.object);
 *
 * Subscribe to an event like:
 * EventBus.$on('i-am-en-event', reactionFunction);
 *
 * To only use an event once use:
 * EventBus.$once('i-am-en-event'...
 *
 * To stop listening to an event use:
 * EventBus.$off('i-am-en-event', reactionFunction);
 */

import Vue from 'vue';
export const EventBus = new Vue();
