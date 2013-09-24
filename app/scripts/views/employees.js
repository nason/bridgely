/*global bridgelyApp, Backbone, JST*/

// TODO: Escape text from incoming twilio texts

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.EmployeesView = Backbone.View.extend({

        initialize: function() {
          // TODO: Filter this to one company_id => the user's company id or the company the admin is viewing
          this.collection = new bridgelyApp.Collections.EmployeesCollection(),

          this.listenTo(this.collection, "change add", this.render);

          this.collection.fetch();

        },
        columns: [{
            name: 'selected',
            label: '',
            cell: 'boolean',
            sortable: false,
            editable: false,
          }, {
            name: "name",
            label: "Name",
            cell: Backgrid.StringCell.extend({
              render: function() {
                this.$el.empty();
                this.$el.html( this.formatter.fromRaw( this.model.attributes ) )
                this.delegateEvents();
                return this;
              }
            }),
            formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
              fromRaw: function (data) {
                return $('<a />').attr('href', '#employee/' + data.id).text( data.name );
              }
            }),
            editable: false
          }, {
            name: "phone",
            label: "Phone",
            cell: "string",
            editable: false
          }, {
            name: "data",
            label: "Labels",
            cell: Backgrid.StringCell.extend({
              render: function () {
                  this.$el.empty();
                  var data = this.model.get('data');
                  var labels = data.labels;

                  labels && this.$el.html( this.formatter.fromRaw( labels ) );

                  this.delegateEvents();
                  return this;
              }
            }),
            formatter:  _.extend({}, Backgrid.CellFormatter.prototype, {
              fromRaw: function (data) {
                var output = [], data = data || [];
                _(data).each(function( label ) {
                  output.push( '<span class="label label-default">' + escape(label) + '</span>' );
                })
                return output.join(' ');
              }
            }),
            editable: false,
            sortable: false
        }],
        employeesGrid: function() {
          return new Backgrid.Grid({
            className: 'table table-hover table-condensed backgrid',
            columns: this.columns,
            collection: this.collection
          })
        },
        template: JST['app/scripts/templates/employees.ejs'],
        render: function() {

          // Initialize the paginator
          var paginator = new Backgrid.Extension.Paginator({
            collection: this.collection
          });

          // var $sendButton = $('<a href="#message" />').text(' Send SMS Message').prepend($('<span class="glyphicon glyphicon-send" />')).addClass('btn btn-lg btn-primary');

          // var $layout = $('<div class=backgrid-container />').append(
          //   this.employeesGrid().render().$el
          //   .add( paginator.render().$el )
          //   .add( $sendButton )
          // )
          // this.$el.html( $layout );
          // $('#content').html( this.el );
          // return this.el;

          $('#content').html( this.template );

          $('.backgrid-container').prepend(
            this.employeesGrid().render().$el
          ).append(
            paginator.render().$el
          );

          return this.el;

        }


    });

})();
