/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.newMessageView = Backbone.View.extend({

        template: JST['app/scripts/templates/newMessage.ejs'],
        el: $('<form />'),
        render: function() {
          this.$el.html( this.template );
          $('#content').html( this.el );
          return this.el;
        }

    });

})();
