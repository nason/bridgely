/*global bridgelyApp, Backbone*/

bridgelyApp.Collections = bridgelyApp.Collections || {};

(function () {
    'use strict';

    bridgelyApp.Collections.AdminCompaniesCollection = Backbone.Collection.extend({

        model: bridgelyApp.Models.AdminCompanyModel,
        url: function() {
          return bridgelyApp.apiUrl + "/admin/companies"
        },

    });

})();
