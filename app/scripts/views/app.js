/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AppView = Backbone.View.extend({

        initialize: function() {
          $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            // Your server goes below
            // options.url = 'http://localhost:3000' + options.url;

            // var token = $("meta[name='Authorization']").attr("Token")
            // jqXHR.setRequestHeader("Authorization", "Token token='t6zKGB6VuMpq8kxtvicuV2hrGChohVf2EtEK99Jq'")

          });

          // Rails CSRF Protection
          // $(document).ajaxSend(function (e, xhr, options) {
          //   var token = $("meta[name='csrf-token']").attr("content");
          //   xhr.setRequestHeader("X-CSRF-Token", token);
          // });
        },

        template: JST['app/scripts/templates/app.ejs'],
        el: $('<main />'),
        render: function() {

          // TODO: Authentication state and role determine the navmenu render and the company_id for the session
          this.$el.attr('id', 'bridgely')
          .html( this.template() );

          // TODO: Where the LoginView is appended; where the current view should be loaded - depnding on auth and user
          this.$el
          .find('#content').html( new bridgelyApp.Views.LoginView().render() );

          // Add the header and footer
          this.$el
          .prepend(new bridgelyApp.Views.NavbarView().render())
          .append(new bridgelyApp.Views.FooterView().render());

          return this.el;
        }

    });

})();
