/*global bridgelyApp, Backbone*/

bridgelyApp.Collections = bridgelyApp.Collections || {};

(function () {
    'use strict';

    bridgelyApp.Collections.EmployeesCollection = Backbone.Collection.extend({

        model: bridgelyApp.Models.EmployeeModel,
        url: "http://localhost:3000/v1/employees"

    });

})();
