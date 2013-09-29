/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.QuestionView = Backbone.View.extend({
        model: bridgelyApp.Models.QuestionView,
        template: JST['app/scripts/templates/question.ejs'],
        events: {},
        render: function() {
          $('#content').html( this.$el );
          this.$el.html( this.template() );

          this.delegateEvents();
          return this.el;
        },
        initialize: function() {
          this.model.fetch();
          // this.render();
          this.model.on('sync change', this.render, this);
        }
    });

})();
