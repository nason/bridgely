/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.MessageView = Backbone.View.extend({

        template: JST['app/scripts/templates/message.ejs'],
        render: function() {
          this.$el.html(this.template(this.model.attributes));
          return this.el;
        }

    });

})();
