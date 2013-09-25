/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminNewCompanyView = Backbone.View.extend({

        template: JST['app/scripts/templates/admin-newCompany.ejs'],
        el: $('<form role="form" />'),
        events: {
          'submit' : 'createCompany'
        },
        render: function() {
          this.delegateEvents();
          this.$el.html( this.template ).addClass('form-horizontal');
          $('#content').html( this.el );
          return this.el;
        },
        createCompany: function() {

        }

    });

})();
