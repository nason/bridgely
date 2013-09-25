/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminCompaniesView = Backbone.View.extend({

        template: JST['app/scripts/templates/admin-companies.ejs']

    });

})();
