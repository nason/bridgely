/*global bridgelyApp, Backbone*/

bridgelyApp.Collections = bridgelyApp.Collections || {};

(function () {
    'use strict';

    bridgelyApp.Collections.EmployeesCollection = Backbone.PageableCollection.extend({

        model: bridgelyApp.Models.EmployeeModel,
        url: function() {
          if( bridgelyApp.session.get('admin') && !bridgelyApp.session.get('company') ) {
            return bridgelyApp.apiUrl + "/employees";
          } else {
            return bridgelyApp.apiUrl + "/companies/" + bridgelyApp.session.get('company').id + "/employees";
          }
        },
        state: {
          pageSize: 50
        },
        mode: "client" // page entirely on the client side

    });

})();
