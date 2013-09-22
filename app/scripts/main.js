/*global bridgelyApp, $*/


window.bridgelyApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        bridgelyApp.session = new bridgelyApp.Models.SessionModel();

        if(bridgelyApp.session.authenticated()) {
            // redirect to landing page / mobile directory
        } else {
            // call a login form, that will call this.session.login(email,password)
        }

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
        _(bridgelyApp.Routers).each(function(router) {
            new router();
        });

        Backbone.history.start();

        // $('body').html(new bridgelyApp.Views.AppView().render())

        console.log('Hello from Bridgely!');
    }
};

$(document).ready(function () {
    'use strict';
    bridgelyApp.init();
}).ajaxError( function(event, jqxhr, settings, exception ) {
    // Capture any ajax request that returns a 401 unauthorized and go to login page
    if (jqxhr.status == 401) {
      window.location = '';
    }
});
