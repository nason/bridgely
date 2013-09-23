/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.DirectoryRouter = Backbone.Router.extend({
      requireLogin: function(ifYes) {
        if (bridgelyApp.session.authenticated()) {
          if (_.isFunction(ifYes)) ifYes.call(this);
        } else {
          bridgelyApp.LoginRouter.navigate('login', {trigger: true})
        }
      },
      routes: {
        'directory' : 'directory',
        'directory/:page' : 'directory'
      },
      directory: function(page) {
        this.requireLogin( function() {
          // router sends params as string
          // check if string is a number, otherwise default to 0
          if( page === undefined || !Number(page) ) {
            page =  0;
          }
          console.log('directory route page ' + page)

          new bridgelyApp.Views.EmployeesView().render();
        });

      }

    });

})();
