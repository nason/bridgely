/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.NavbarView = Backbone.View.extend({

        template: JST['app/scripts/templates/navbar.ejs'],
        el: $('<nav class="navbar navbar-default container" role=navigation />'),
        render: function() {
          return this.$el.html(this.template)
        }

    });

})();
