/*global bridgelyApp, Backbone*/

bridgelyApp.Collections = bridgelyApp.Collections || {};

(function () {
    'use strict';

    bridgelyApp.Collections.MessagesCollection = Backbone.PageableCollection.extend({

        model: bridgelyApp.Models.MessageModel,
        url: function() {
          if( bridgelyApp.session.get('admin') && bridgelyApp.session.get('company') ) {
            return bridgelyApp.apiUrl + "/messages/company/" + bridgelyApp.session.get('company').id
          } else {
            return bridgelyApp.apiUrl + "/messages"
          }
        },
        state: {
          pageSize: 10
        },
        mode: "client"

    });

})();
