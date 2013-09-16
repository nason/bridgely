/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.LoginRouter = Backbone.Router.extend({
      routes: {
        login : 'login'
      },
      login: function() {
        console.log('login route!')
      },
      logout: function() {
        console.log('logout route!')
      }

    });

})();
