/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminCompaniesView = Backbone.View.extend({
        collection: bridgelyApp.Collections.AdminCompaniesCollection,
        template: JST['app/scripts/templates/admin-companies.ejs'],
        initialize: function() {
          // this.collection = new bridgelyApp.Collections.AdminCompaniesCollection();
          // this.listenTo(this.collection, "change add", this.render);
          // this.collection.fetch();
        },
        render: function() {
          this.$el.html( this.template );
          // $('#content').html( this.el );
          this.delegateEvents();
          return this.el;
        }
    });

})();
