/*global bridgelyApp, Backbone*/

bridgelyApp.Collections = bridgelyApp.Collections || {};

(function () {
    'use strict';

    bridgelyApp.Collections.EmployeesCollection = Backbone.PageableCollection.extend({

        model: bridgelyApp.Models.EmployeeModel,
        url: function() {
          return bridgelyApp.apiUrl + "/employees"
        },
        state: {
          pageSize: 2
        },
        mode: "client" // page entirely on the client side

    });

})();
