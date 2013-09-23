/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AppView = Backbone.View.extend({

        initialize: function() {
          // $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            // Your server goes below
            // options.url = 'http://localhost:3000' + options.url;
          // });

          // Rails CSRF Protection
          // $(document).ajaxSend(function (e, xhr, options) {
          //   var token = $("meta[name='csrf-token']").attr("content");
          //   xhr.setRequestHeader("X-CSRF-Token", token);
          // });


          this.navbar = new bridgelyApp.Views.NavbarView();
          this.footer = new bridgelyApp.Views.FooterView();

          this.on('authenticated', this.authenticated, this);

        },

        template: JST['app/scripts/templates/app.ejs'],
        el: $('<main />'),
        render: function() {

          // TODO: Authentication state and role determine the navmenu render and the company_id for the session
          this.$el.html( this.template ).attr('id', 'bridgely');

          // Add the header and footer
          // this.$el.prepend(navbar.render())
          // this.$el.append(footer.render());

          $('body').html(this.el);

          this.$el.prepend(this.navbar.$el);
          _.once( this.navbar.render() );

          this.$el.append(this.footer.$el);

        },
        authenticated: function() {
          bridgelyApp.DirectoryRouter.navigate('directory', {trigger: true});
        }

    });

})();
