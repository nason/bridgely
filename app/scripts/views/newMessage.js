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
        },
        events: {
          'submit' : 'sendMessage'
        },
        sendMessage: function(event) {
          event.preventDefault();
          $.ajax({
            type: 'POST',
            url: bridgelyApp.apiUrl + '/messages',
            data: {
              message: {
                body: this.$('textarea').val(),
                employee_ids: 'all', // TODO: get a list of ids or 'all'
                company_id: bridgelyApp.session.get('account').company.id
              }
            },
            success: function() {
              //TODO: Success screen
              console.log('message sent successfully')
            },
            error: function() {
              //TODO: Error screen
              console.log('mesaage send failed!!')
            }
          })
        }

    });

})();
