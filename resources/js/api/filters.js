import _ from 'underscore';
import api from './general';
import { EventBus } from '@crex/events/EventBus';

export default {
    getMajorFacets(cb, errorCb) {
        let url = api.makeURL(
            '/facets/major'
        );

        api.getRequest(
            url,
            true,
            function (data) {
                console.log(data);
                cb(data);
            },
            function (err) {
                errorCb(err);

                EventBus.$emit('showNotification', {
                  title: 'Cannot get major facets',
                  description: 'Somethings gone wrong',
                  success: false
                });
            });
    },

    getFacets(index, facets, cb, errorCb) {
        let url = api.makeURL(
            '/facets'
        );

        let object = {
          index,
          facets
        };

        api.postRequest(
            url,
            object,
            [],
            true,
            function (data) {
                cb(data);
            },
            function (err) {
                errorCb(err);
                EventBus.$emit('showNotification', {
                  title: 'Cannot get facets',
                  description: 'Somethings gone wrong',
                  success: false
                });
            });
    },

    getFacetsInGroup(index, facets, group, page, cb, errorCb) {
        let url = api.makeURL(
            '/facets/group'
        );

        let object = {
          index,
          facets,
          group,
          page
        };

        api.postRequest(
            url,
            object,
            [],
            true,
            function (data) {
                cb(data);
            },
            function (err) {
                errorCb(err);
                EventBus.$emit('showNotification', {
                  title: 'Cannot get facets',
                  description: 'Somethings gone wrong',
                  success: false
                });
            });
    },

    searchFacets(search, cb, errorCb) {
        let url = api.makeURL(
            '/facets/search'
        );

        let object = {
          search
        };

        api.postRequest(
            url,
            object,
            [],
            true,
            function (data) {
                cb(data);
            },
            function (err) {
                errorCb(err);

                EventBus.$emit('showNotification', {
                  title: 'Cannot get filters',
                  description: 'Somethings gone wrong',
                  success: false
                });
            });
    },

    likes(filters, cb, errorCb) {
        let url = api.makeURL(
            '/feed/likes'
        );

        let object = {
          filters
        };

        api.postRequest(
            url,
            object,
            [],
            false,
            function (data) {
                cb(data);
            },
            function (err) {
                errorCb(err);

                EventBus.$emit('showNotification', {
                  title: 'Cannot get feed',
                  description: 'Somethings gone wrong',
                  success: false
                });
            });
    },

    like(filters, cb, errorCb) {
        let url = api.makeURL(
            '/feed/like'
        );

        let object = {
          filters
        };

        api.postRequest(
            url,
            object,
            [],
            true,
            function (data) {
                cb(data);
            },
            function (err) {
                errorCb(err);
                EventBus.$emit('showNotification', {
                  title: 'Cannot like feed',
                  description: 'Somethings gone wrong',
                  success: false
                });
            });
    }
}
