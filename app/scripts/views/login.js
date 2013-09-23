/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.LoginView = Backbone.View.extend({

        template: JST['app/scripts/templates/login.ejs'],
        className: 'form-login',
        render: function() {
          this.$el.html(this.template);
          this.$('.alert').hide();
        },
        events: {
          'submit' : 'login'
        },
        login: function(event){
          event.preventDefault();
          bridgelyApp.session.login( this.$('#email').val(), this.$('#password').val() )
        },
        initialize: function() {
          this.render();

          bridgelyApp.session.on('authentication-error', function() {
            // Show flash notice
            this.$('.alert').fadeIn();
          }, this);
        }


    });

})();
