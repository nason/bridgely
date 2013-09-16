/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.AdminRouter = Backbone.Router.extend({
      routes: {
        admin : 'admin',
        'admin/users' : 'users',
        'admin/companies' : 'companies'

      },
      admin: function() {
        console.log('admin route!')
      },
      users: function() {
        console.log('admin users route!')
      },
      companies: function() {
        console.log('admin companies route!!')
      }

    });

})();
