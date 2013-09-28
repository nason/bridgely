/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AppView = Backbone.View.extend({

        initialize: function() {
          $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            //Your server goes below
            //options.url = 'http://localhost:3000' + options.url;
            if( bridgelyApp.session.get('auth_token') ) {
              options.headers = {
                'Authorization': "Token token="+bridgelyApp.session.get('auth_token')
              };
            }
          });

          // Rails CSRF Protection
          // $(document).ajaxSend(function (e, xhr, options) {
          //   var token = $("meta[name='csrf-token']").attr("content");
          //   xhr.setRequestHeader("X-CSRF-Token", token);
          // });

          this.navbar = new bridgelyApp.Views.NavbarView();
          this.footer = new bridgelyApp.Views.FooterView();

          this.on('authenticated', this.authenticated, this);
          this.on('admin-authenticated', this.adminAuth, this);
          this.on('unauthenticate', this.unauthenticate, this);
        },

        template: JST['app/scripts/templates/app.ejs'],
        el: $('<main />'),
        render: function() {
          this.$el.html( this.template ).attr('id', 'bridgely');

          $('body').html(this.el);

          this.$el.prepend(this.navbar.$el);
          _.once( this.navbar.render() );

          this.$el.append(this.footer.$el);
        },
        unauthenticate: function() {
          bridgelyApp.IndexRouter.navigate('', {trigger: true});
        },
        authenticated: function() {
          bridgelyApp.DirectoryRouter.navigate('directory', {trigger: true});
        },
        adminAuth: function() {
          bridgelyApp.AdminRouter.navigate('admin/companies', {trigger: true});
        }

    });

})();
