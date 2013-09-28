/*global bridgelyApp, Backbone*/

bridgelyApp.Collections = bridgelyApp.Collections || {};

(function () {
    'use strict';

    bridgelyApp.Collections.MessagesCollection = Backbone.PageableCollection.extend({

        model: bridgelyApp.Models.MessageModel,
        url: function() {
          if( bridgelyApp.session.get('admin') && !bridgelyApp.session.get('company') ) {
            return bridgelyApp.apiUrl + "/messages";
          } else {
            return bridgelyApp.apiUrl + "/companies/" + bridgelyApp.session.get('company').id + "/messages";
          }
        },
        state: {
          pageSize: 50
        },
        mode: "client"

    });

})();
