/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.EmployeeRouter = Backbone.Router.extend({
      routes: {
        'employee/:id' : 'employee'
      },
      employee: function(id) {
        if ( id === undefined || !Number(id) ) {
          throw new Error('employee id must be present');
        } else {
          console.log('employee route for id: ' + id);
        }
      }

    });

})();
