/*global bridgelyApp, $*/


window.bridgelyApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
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
});
