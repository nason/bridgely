/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.MessagesView = Backbone.View.extend({

        initialize: function() {
          // TODO: Filter this to one company_id => the user's company id or the company the admin is viewing
          this.collection = new bridgelyApp.Collections.MessagesCollection(),

          this.listenTo(this.collection, "change add", this.render);

          this.collection.fetch();
        },
        columns: [{
            name: 'selected',
            label: '',
            cell: 'boolean',
            sortable: false,
            editable: false
          }, {
            name: "employee_ids",
            label: "Employee IDs",
            cell: "string",
            editable: false
          }, {
            name: "question_id",
            label: "Question ID",
            cell: "string",
            editable: false
          }, {
            name: "body",
            label: "Message",
            cell: "string",
            editable: false
          }, {
            name: "direction",
            label: "Direction",
            cell: "string",
            editable: false
        }],
        messagesGrid: function() {
          return new Backgrid.Grid({
            className: 'table table-hover table-condensed backgrid',
            columns: this.columns,
            collection: this.collection
          })
        },
        template: JST['app/scripts/templates/messages.ejs'],
        render: function() {

          // Initialize the paginator
          var paginator = new Backgrid.Extension.Paginator({
            collection: this.collection
          });

          $('#content').html( this.template );

          $('.backgrid-container').prepend(
            this.messagesGrid().render().$el
          ).append(
            paginator.render().$el
          );

          return this.el;

        }


    });

})();