/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.EmployeesView = Backbone.View.extend({

        initialize: function() {
          // TODO: Filter this to one company_id
          this.collection = new bridgelyApp.Collections.EmployeesCollection(),

          this.listenTo(this.collection, "change add", this.render);

          this.collection.fetch();
        },
        // template: JST['app/scripts/templates/employees.ejs'],
        columns: [{
            name: 'selected',
            label: '',
            cell: 'boolean',
            sortable: false,
            editable: false
          }, {
            name: "name",
            label: "Name",
            cell: "string",
            editable: false
          }, {
            name: "phone",
            label: "Phone",
            cell: "string",
            editable: false
            //cell: Backgrid.IntegerCell.extend({
              //orderSeparator: ''
            //})
          }, {
            name: "tags",
            label: "Tags",
            cell: "string",
            editable: false,
            sortable: false
          }],
        render: function() {

          // Initialize a new Grid instance
          var employeesGrid = new Backgrid.Grid({
            className: 'backgrid lead',
            columns: this.columns,
            collection: this.collection
          });

          var sendButton = $('<button type="button" />').text('Send SMS Message').addClass('btn btn-lg btn-primary');

          // Render the grid and attach the root to your HTML document
          return this.$el.html( employeesGrid.render().$el.add(sendButton) );
        }

    });

})();
