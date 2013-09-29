/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.QuestionView = Backbone.View.extend({
        model: bridgelyApp.Models.QuestionView,
        template: JST['app/scripts/templates/question.ejs'],
        events: {
          'click .back' : 'back',
          'click .employee' : 'viewEmployee'
        },
        back: function() {
          event.preventDefault();
          bridgelyApp.MessageRouter.navigate('message-history', {trigger: true});
        },
        viewEmployee: function() {
          event.preventDefault;
          var employeeId = event.target.className.split('-')[1];
          bridgelyApp.EmployeeRouter.navigate('employee/' + employeeId, {trigger: true});
        },
        getEmployees: function() {
          var question = this;
          $.ajax({
            method: 'GET',
            url: this.model.url() + '/employees',
            success: function(employeeData) {
              question.model.set('employees', employeeData);
            }
          })
        },
        render: function() {
          $('#content').html( this.$el );
          this.$el.html( this.template() );

          this.delegateEvents();
          return this.el;
        },
        initialize: function() {
          $("html, body").scrollTop(0);
          this.model.fetch();
          this.getEmployees();
          // this.render();
          this.model.on('sync change', this.render, this);
        }
    });

})();
