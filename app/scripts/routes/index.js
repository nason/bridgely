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
        if( !bridgelyApp.session || !bridgelyApp.session.authenticated() ) {
          bridgelyApp.appView.render();
        } else {

          (bridgelyApp.session.get('admin'))
          ? bridgelyApp.appView.trigger('admin-authenticated')
          : bridgelyApp.appView.trigger('authenticated');

        }
      },
      settings: function() {
        this.requireLogin(function() {
          new bridgelyApp.Views.SettingsView().render();
        })
      }
    });

})();
