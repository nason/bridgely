/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminCompaniesView = Backbone.View.extend({
        // collection: bridgelyApp.Collections.AdminCompaniesCollection,
        template: JST['app/scripts/templates/admin-companies.ejs'],
        initialize: function() {
          this.collection = new bridgelyApp.Collections.AdminCompaniesCollection();

          this.collection.on('sync', function(collection, resp, options) {
            this.render();
          }, this);

          this.collection.fetch();
        },

        render: function() {
          $('content').html( this.$el.html( this.template(this.collection.models) ) );
          this.delegateEvents();
          return this.el;
        }
    });

})();
