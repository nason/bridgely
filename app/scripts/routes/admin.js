/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.AdminRouter = Backbone.Router.extend({
      routes: {
        'admin/users' : 'users',
        'admin/companies' : 'companies',
        'admin/companies/new' : 'newCompany'
      },
      // TODO: Require Admin!!!!!!!
      requireLogin: function(ifYes) {
        if (bridgelyApp.session.authenticated()) {
          if (_.isFunction(ifYes)) ifYes.call(this);
        } else {
          bridgelyApp.LoginRouter.navigate('login', {trigger: true})
        }
      },
      users: function() {
        console.log('admin users route!')
      },
      companies: function() {
        console.log('admin companies route!!')
        this.requireLogin(function() {
          new bridgelyApp.Views.AdminCompaniesView().render();
        })
      },
      newCompany: function() {
        console.log('admin new company route!!')
        this.requireLogin(function() {
          new bridgelyApp.Views.AdminNewCompanyView().render();
        })
      }
    });

})();
