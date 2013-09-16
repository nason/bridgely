/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.EmployeesView = Backbone.View.extend({

        template: JST['app/scripts/templates/employees.ejs'],
        initialize: function() {
          // TODO: Filter this to one company_id
          this.collection = new bridgelyApp.Collections.EmployeesCollection(),

          this.listenTo(this.collection, "change add", this.render);

          this.collection.fetch();
        },
        render: function() {

          // var modelTemplates = _(this.collection.models).map(function(model) {
          //   return new bridgelyApp.Views.EmployeeView({model: model}).render();
          // }, this);

          // return this.$el.html(modelTemplates);

          var columns = [{
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
          }];

          // Initialize a new Grid instance
          var employeesGrid = new Backgrid.Grid({
            className: 'backgrid lead',
            columns: columns,
            collection: this.collection
          });

          // Render the grid and attach the root to your HTML document
          return this.$el.html(employeesGrid.render().el);
        }

    });

})();
