/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.LoginRouter = Backbone.Router.extend({
      routes: {
        login : 'login'
      },
      login: function() {
        $('#content').html( new bridgelyApp.Views.LoginView().el );
      }
    });

})();
