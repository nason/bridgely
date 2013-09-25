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
          console.log('yes!');
        },
        render: function() {
          this.$el.html( this.template ).addClass('form-horizontal').attr('role', 'form');
          $('#content').html( this.el );
          this.delegateEvents();
          return this.el;
        }
    });

})();
