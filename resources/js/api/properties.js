import api from './general';

export default {
    get(dateFrom, dateTo, soldFrom, soldTo, zipCode, cb, errorCb) {
        let url = api.makeURL(
            '/properties'
        );

        let object = {
          dateFrom,
          dateTo,
          soldFrom,
          soldTo,
          zipCode
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
            });
    }
}
