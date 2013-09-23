/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.newQuestionView = Backbone.View.extend({

        template: JST['app/scripts/templates/newQuestion.ejs'],
        el: $('<form />'),
        render: function() {
          this.$el.html( this.template );
          $('#content').html( this.el );
          return this.el;
        }

    });

})();
