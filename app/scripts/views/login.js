/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.LoginView = Backbone.View.extend({

        template: JST['app/scripts/templates/login.ejs'],
        className: 'form-login',
        render: function() {
          return this.$el.html(this.template);
        }


    });

})();
