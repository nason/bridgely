/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminNewCompanyView = Backbone.View.extend({

        template: JST['app/scripts/templates/admin-newCompany.ejs'],
        el: $('<form />'),
        events: {
          'submit' : 'createCompany'
        },
        createCompany: function(event) {
          event.preventDefault();
          this.$('button[type=submit]').prop('disabled', true);

          $.ajax({
            type: 'POST',
            url: bridgelyApp.apiUrl + '/admin/company',
            headers: {
              // left this in bc ajaxSetup headers didn't apply here?
              'Authorization': "Token token="+bridgelyApp.session.get('auth_token')
            },
            data: {
              company: {
                name: this.$('input[name=name]').val(),
                settings: {
                  autoresponder: this.$('textarea[name=autoresponder]').val()
                },
                user: {
                  email: this.$('input[name=email]').val(),
                  password: his.$('input[name=password]').val()
                }
              }
            },
            success: function() {
              // TODO: Flash success?
              console.log('company created successfully');
              bridgelyApp.AdminRouter.navigate('admin/companies', {trigger: true});
            },
            error: function() {
              //TODO: Error screen
              console.log('mesaage send failed!!')
              bridgelyApp.AdminRouter.navigate('admin/companies', {trigger: true});
              alert('Oh no, something went wrong. Try again...');
            }
          })
        },
        render: function() {
          this.$el.html( this.template ).addClass('form-horizontal').attr('role', 'form');
          $('#content').html( this.el );
          this.delegateEvents();
          return this.el;
        }
    });

})();
