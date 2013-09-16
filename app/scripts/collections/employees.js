/*global bridgelyApp, Backbone*/

bridgelyApp.Collections = bridgelyApp.Collections || {};

(function () {
    'use strict';

    bridgelyApp.Collections.EmployeesCollection = Backbone.PageableCollection.extend({

        model: bridgelyApp.Models.EmployeeModel,
        url: "http://localhost:3000/v1/employees",
        state: {
          pageSize: 3
        },
        mode: "client" // page entirely on the client side

    });

})();
