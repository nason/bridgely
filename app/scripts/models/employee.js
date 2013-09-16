/*global bridgelyApp, Backbone*/

bridgelyApp.Models = bridgelyApp.Models || {};

(function () {
    'use strict';

    bridgelyApp.Models.EmployeeModel = Backbone.Model.extend({
      defaults: {
        "name":  null,
        "phone":  null,
        "company_id":  null,
        "data":  null
      }
    });

})();
