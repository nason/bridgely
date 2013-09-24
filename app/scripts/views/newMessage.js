/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.newMessageView = Backbone.View.extend({

        template: JST['app/scripts/templates/newMessage.ejs'],
        el: $('<form />'),
        render: function() {
          this.delegateEvents();
          this.$el.html( this.template );
          $('#content').html( this.el );
          return this.el;
        },
        events: {
          'submit' : 'sendMessage',
          'click #success-button' : 'next'
        },
        sendMessage: function(event) {
          event.preventDefault();
          this.$('button[type=submit]').prop('disabled', true);

          $.ajax({
            type: 'POST',
            url: bridgelyApp.apiUrl + '/messages',
            data: {
              message: {
                body: this.$('textarea').val(),
                employee_ids: 'all', // TODO: get a list of ids or 'all'
                company_id: bridgelyApp.session.get('company').id
              }
            },
            success: function() {
              console.log('message sent successfully');
              $('#successModal').modal({
                backdrop: 'static',
                keyboard: false
              });
            },
            error: function() {
              //TODO: Error screen
              console.log('mesaage send failed!!')
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
