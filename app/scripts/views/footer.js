/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.FooterView = Backbone.View.extend({

        template: JST['app/scripts/templates/footer.ejs'],
        el: $('<footer/>'),
        render: function() {
          this.$el.html(this.template);
          this.delegateEvents();
        },
        initialize: function() {
          this.render();
        }

    });

})();
