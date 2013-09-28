/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.SettingsView = Backbone.View.extend({

        template: JST['app/scripts/templates/settings.ejs'],
        el: $('<form />'),
        events: {
          'submit' : 'submitSettings'
        },
        render: function() {
          this.delegateEvents();
          this.$el.html( this.template );
          $('#content').html( this.el );

          if( !bridgelyApp.session.get('company') ) {
            this.$('button[type=submit]').prop('disabled', true).text('Select a company first...');
          } else {
            this.$('textarea').val( bridgelyApp.session.get('company').settings.autoresponder ).limiter(160, $('#chars'));
          }

          return this.el;
        },
        submitSettings: function(event) {
          event.preventDefault();
          this.$('button[type=submit]').prop('disabled', true);

          $.ajax({
            type: 'PUT',
            url: bridgelyApp.apiUrl + '/admin/companies/' + bridgelyApp.session.get('company').id,
            headers: {
              // left this in bc ajaxSetup headers didn't apply here?
              'Authorization': "Token token="+bridgelyApp.session.get('auth_token')
            },
            data: {
              company: {
                settings: {
                  autoresponder: this.$('textarea').val(),
                  responder_link_root: this.$('#responder-link-root').val()
                }
              }
            },
            success: function() {
              // todo: success topbar
              // todo: update session company settings obj
              bridgelyApp.MessageRouter.navigate('directory', {trigger: true});

            },
            error: function() {
              //TODO: Error screen
            }
          });
        }

    });

})();
