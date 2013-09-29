/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminNewCompanyView = Backbone.View.extend({

        template: JST['app/scripts/templates/adminNewCompany.ejs'],
        el: $('<form />'),
        events: {
          'submit' : 'createCompany',
          'click .cancel' : 'cancel'
        },
        createCompany: function(event) {
          event.preventDefault();
          this.$('button[type=submit]').prop('disabled', true);

          $.ajax({
            type: 'POST',
            url: bridgelyApp.apiUrl + '/admin/companies',
            data: {
              company: {
                name: this.$('input[name=company-name]').val(),
                short_name: this.$('input[name=company-short-name]').val(),
                settings: {
                  autoresponder: this.$('textarea[name=autoresponder]').val(),
                  responder_link_root: this.$('input[name=autoresponder-link]').val()
                },
                users: {
                  email: this.$('input[name=email]').val(),
                  name: this.$('input[name=users-name]').val(),
                  password: this.$('input[name=password]').val()
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
        cancel: function() {
          event.preventDefault();
          bridgelyApp.AdminRouter.navigate('admin/companies',{trigger:true});
        },
        render: function() {
          this.$el.html( this.template ).addClass('form-horizontal').attr('role', 'form');
          $('#content').html( this.el );
          this.delegateEvents();
          return this.el;
        }
    });

})();
