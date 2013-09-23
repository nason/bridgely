/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.NavbarView = Backbone.View.extend({
        template: JST['app/scripts/templates/navbar.ejs'],
        el: $('<nav role="navigation" />'),
        events: {
          'click #logout' : 'signOut'
        },
        signOut: function(event) {
          event.preventDefault();
          bridgelyApp.session.logout();
        },
        render: function() {
          this.$el.addClass("navbar navbar-default container");
          this.$el.html( this.template() );
          this.delegateEvents();
        },
        initialize: function() {
          this.render();

          // Re-render when the session changes
          bridgelyApp.session.on('change', function() {
            this.render();
          }, this);
        }
        // This almost gets the menu toggles working
        // initialize: function() {
        //   var that = this;
        //   this.$el.on('click', function(e) {
        //     that.toggleSelected($(e.target).closest('li'));
        //   });
        // },
        // toggleSelected: function(el) {
        //   console.log(el)
        //   $(el).addClass('active');
        //   $(el).siblings().removeClass('active');
        // }

    });

})();
