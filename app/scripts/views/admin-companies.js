/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminCompaniesView = Backbone.View.extend({
        template: JST['app/scripts/templates/admin-companies.ejs'],
        initialize: function() {
          this.collection = new bridgelyApp.Collections.AdminCompaniesCollection();
          this.collection.on('sync', function(collection, resp, options) {
            this.render();
          }, this);
          this.collection.fetch();
        },
        events: {
          'click .company' : 'loadCompany',
          'click .btn-company' : 'newCompany'
        },
        render: function() {
          this.$el.html( this.template(this.collection.models) );
          $('#content').html( this.el );
          this.delegateEvents();
          return this.el;
        },
        loadCompany: function(event) {
          event.preventDefault();
          console.log($(event.target));
          console.log(this, event.target.id)
        },
        newCompany: function(event) {
          event.preventDefault();
          bridgelyApp.AdminRouter.navigate('admin/companies/new', {trigger: true});
        }
    });

})();
