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
