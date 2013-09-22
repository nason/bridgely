/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.LoginView = Backbone.View.extend({

        template: JST['app/scripts/templates/login.ejs'],
        className: 'form-login',
        render: function() {
          return this.$el.html(this.template);
        },
        events: {
          'submit' : 'login'
        },
        login: function(event){
          event.preventDefault();
          bridgelyApp.session.login( this.$el.find('#email').val(), this.$el.find('#password').val() )
        }


    });

})();
