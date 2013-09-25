/*global bridgelyApp, Backbone*/

bridgelyApp.Models = bridgelyApp.Models || {};

(function () {
    'use strict';

    bridgelyApp.Models.AdminCompanyModel = Backbone.Model.extend({
      defaults: {
        "name": null,
        "settings": null
      }

    });

})();
