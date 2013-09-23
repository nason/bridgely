/*global bridgelyApp, Backbone*/

bridgelyApp.Collections = bridgelyApp.Collections || {};

(function () {
    'use strict';

    bridgelyApp.Collections.MessagesCollection = Backbone.PageableCollection.extend({

        model: bridgelyApp.Models.MessageModel,
        url: function() {
          return bridgelyApp.apiUrl + "/messages"
        },
        state: {
          pageSize: 10
        },
        mode: "client"

    });

})();
