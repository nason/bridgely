/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.EmployeeRouter = Backbone.Router.extend({
      requireLogin: function(ifYes) {
        if (bridgelyApp.session.authenticated()) {
          if (_.isFunction(ifYes)) ifYes.call(this);
        } else {
          bridgelyApp.LoginRouter.navigate('login', {trigger: true})
        }
      },
      routes: {
        'employee/:id' : 'employee'
      },
      employee: function(id) {
        this.requireLogin(function() {
          if ( id === undefined || !Number(id) ) {
            throw new Error('employee id must be present');
          } else {
            console.log('employee route for id: ' + id);
            var employee = new bridgelyApp.Models.EmployeeModel({id: id})
            new bridgelyApp.Views.EmployeeView({model: employee}).render();
          }
        })
      }
    });

})();
