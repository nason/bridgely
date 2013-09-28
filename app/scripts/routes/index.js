/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.IndexRouter = Backbone.Router.extend({
      requireLogin : function(ifYes) {
        if (bridgelyApp.session.authenticated()) {
          if (_.isFunction(ifYes)) ifYes.call(this);
        } else {
          bridgelyApp.LoginRouter.navigate('login', {trigger: true})
        }
      },
      routes: {
        '' : 'index',
        'settings' : 'settings'
        // '*catch' : 'index'
      },
      index: function() {
        bridgelyApp.appView.render();
      },
      settings: function() {
        this.requireLogin(function() {
          new bridgelyApp.Views.SettingsView().render();
        })
      }
    });

})();
