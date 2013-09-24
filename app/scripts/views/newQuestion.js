/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.newQuestionView = Backbone.View.extend({

        template: JST['app/scripts/templates/newQuestion.ejs'],
        el: $('<form />'),
        render: function() {
          this.delegateEvents();
          this.$el.html( this.template );
          $('#content').html( this.el );
          return this.el;
        },
        events: {
          'submit' : 'sendQuestion',
          'click #success-button' : 'next'
        },
        sendQuestion: function(event) {
          event.preventDefault();
          this.$('button[type=submit]').prop('disabled', true);

          $.ajax({
            type: 'POST',
            url: bridgelyApp.apiUrl + '/questions',
            data: {
              question: {
                title: this.$('#question-title').val(),
                response_tag: this.$('#question-tag').val(),
                message: {
                  body: this.$('textarea').val(),
                  employee_ids: 'all', // TODO: get a list of ids or 'all'
                  company_id: bridgelyApp.session.get('company').id
                }
              }
            },
            success: function() {
              console.log('question sent successfully')
              $('#successModal').modal({
                backdrop: 'static',
                keyboard: false
              });
            },
            error: function() {
              //TODO: Error screen
              console.log('question send failed!!')
            }
          })
        },
        next: function() {
          this.$('#successModal').on('hidden.bs.modal', function () {
            bridgelyApp.MessageRouter.navigate('message-history', {trigger: true});
          })
          this.$('#successModal').modal('hide');
        }

    });

})();
