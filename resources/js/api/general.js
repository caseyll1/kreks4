import store from '@crex/store';
import axios from 'axios';
import _ from 'underscore';

export default {

    getRequest(url, ignoreAuthentication = false, cb, errorCb) {
        var self = this;

        let authenticated = this.setAxiosData(ignoreAuthentication);

        if(authenticated) {
          axios.get(url,
          ).then(function(response){
              return response
          }).then(function(data) {
              cb(data);
          })
          .catch(function(err){
              if(err.response) {
                if(err.response.status === 401) {
                  console.error('unauthenticated');
                }
              }

              errorCb(err);
          });
        } else {
          errorCb('unauthenticated');
        }
    },

    postRequest(url, object, headers, ignoreAuthentication = false, cb, errorCb) {

        var self = this;

        let authenticated = this.setAxiosData(ignoreAuthentication);

        if(authenticated || ignoreAuthentication) {
          /*
            Make the request to the POST /single-file URL
          */
          axios.post( url, object, headers,
          ).then(function(response){
              return response
          }).then(function(data) {
              cb(data);
          })
          .catch(function(err){
              if(err.response) {
                if(err.response.status === 401) {
                  store.dispatch('authentication/logout');
                }
              }
              errorCb(err);
          });
        } else {
          errorCb('unauthenticated');
        }
    },

    deleteRequest(url, ignoreAuthentication = false, cb, errorCb) {
        let authenticated = this.setAxiosData(ignoreAuthentication);

        if(authenticated) {
          /*
            Make the request to the POST /single-file URL
          */
          axios.delete(url
              ).then(function(response){
                  return response
              }).then(function(data) {
                  cb(data);
              }).catch(function(err){
                  if(err.response) {
                    if(err.response.status === 401) {
                      store.dispatch('authentication/logout');
                    }
                  }
                  errorCb(err);
              });
        } else {
          errorCb('unauthenticated');
        }
    },

    setAxiosData(ignoreAuthentication) {
      let isLoggedIn = store.getters['authentication/isLoggedIn'];
      let token = store.getters['authentication/getApiToken'];

      if(!ignoreAuthentication) {
        if(!isLoggedIn) {
          store.dispatch('authentication/logout');
          return false;
        }
      }

      if(isLoggedIn) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      }

      axios.defaults.headers.common['Content-Type'] = 'application/json';

      return true;
    },

    makeURL(uri, params = null) {
        let API_URL = '/api';

        uri = uri + '?';

        if(params) {
          _.each(params, (param) => {
              uri = uri + '&' + param;
          });
        }

        return API_URL + uri;
    }

}
