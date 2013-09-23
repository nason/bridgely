/*global bridgelyApp, $*/


window.bridgelyApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        bridgelyApp.session = new bridgelyApp.Models.SessionModel();
        bridgelyApp.appView = new bridgelyApp.Views.AppView({model: bridgelyApp.session});

        // Override Backbone Sync
        var sync = Backbone.sync;
        Backbone.sync = function(method, model, options) {
          options.beforeSend = function (xhr) {
            // Send a token
            if( bridgelyApp.session.get('auth_token') !== null ) {
              xhr.setRequestHeader("Authorization", "Token token="+bridgelyApp.session.get('auth_token'));
            }
          };

          // Update other options here

          // Call original sync method
          sync(method, model, options);
        };

        // Initialize all the routers
        _(bridgelyApp.Routers).each(function(router,name) {
            bridgelyApp[name] = new router();
        });
        Backbone.history.start();

        if( !bridgelyApp.session.authenticated() ) {
            bridgelyApp.LoginRouter.navigate('login', {trigger: true})
        } else {
            bridgelyApp.appView.render();
        }

        console.log('Hello from Bridgely!');
    }
};

$(document).ready(function () {
    'use strict';
    bridgelyApp.init();
}).ajaxError( function(event, jqxhr, settings, exception ) {
    console.log('error',event, jqxhr, settings, exception)
    // Capture any ajax request that returns a 401 unauthorized and go to login page
    // On 403 forbidden go to denied page
    // if (jqxhr.status === 401) {
    //   window.location = '#login';
    // } else if (jqxhr.status === 403) {
    //   window.location = '#denied'
    // }
});
