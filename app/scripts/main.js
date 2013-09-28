/*global bridgelyApp, $*/


window.bridgelyApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        // bridgelyApp.apiUrl = "http://localhost:3000/v1";
        bridgelyApp.apiUrl = "http://fierce-anchorage-5632.herokuapp.com/v1";
        // bridgelyApp.apiUrl = "/v1";

        bridgelyApp.session = new bridgelyApp.Models.SessionModel();

        bridgelyApp.appView = new bridgelyApp.Views.AppView({model: bridgelyApp.session});

        // Override Backbone Sync, send authorization headers with every sync request
        // var sync = Backbone.sync;
        // Backbone.sync = function(method, model, options) {
        //   options.beforeSend = function (xhr) {
        //     // Send a token
        //     if( bridgelyApp.session.get('auth_token') !== null ) {
        //       xhr.setRequestHeader("Authorization", "Token token="+bridgelyApp.session.get('auth_token'));
        //     }
        //   };

        //   // Update other options here

        //   // Call original sync method
        //   sync(method, model, options);
        // };

        // Initialize all the routers
        _(bridgelyApp.Routers).each(function(router,name) {
            bridgelyApp[name] = new router();
        });

        // TODO: Initialize all the routers in place, update references to bridgelyApp.routerName.navigate to bridgelyApp.Routers.routerName.navigate
        // _(bridgelyApp.Routers).each(function(router,name) {
        //     bridgelyApp.Routers[name] = new router();
        // });

        // Reload correct view on page refresh
        if(Backbone.history.fragment) {
            Backbone.history.loadUrl(Backbone.history.fragment);
        }

        Backbone.history.start();
        // Backbone.history.start({pushState:true});

        console.log('Hello from Bridgely!');
    }
};

$(document).ready(function () {
    'use strict';

    $.fn.extend( {
    limiter: function(limit, elem) {
        $(this).on("keyup focus", function() {
            setCount(this, elem);
        });
        function setCount(src, elem) {
            var chars = src.value.length;
            if (chars > limit) {
                src.value = src.value.substr(0, limit);
                chars = limit;
            }
            elem.html( limit - chars );
        }
        setCount($(this)[0], elem);
      }
    });

    bridgelyApp.init();

});

$(document).ajaxError( function(event, jqxhr, settings, exception ) {
    console.log('error',event, jqxhr, settings, exception)
    // Capture any ajax request that returns a 401 unauthorized and go to login page
    // On 403 forbidden go to denied page
    // TODO: Flash error message, destroy session?
    if (jqxhr.status === 401) {
      bridgelyApp.session.destroy();
      bridgelyApp.LoginRouter.navigate('login', {trigger:true});
    } else if (jqxhr.status === 403) {
      bridgelyApp.IndexRouter.navigate('', {trigger:true});
    }
});
