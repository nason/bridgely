/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.MessagesView = Backbone.View.extend({

        initialize: function() {
          this.collection = new bridgelyApp.Collections.MessagesCollection(),
          this.listenTo(this.collection, "change add", this.render);
          this.collection.fetch();
        },
        // fetchEmployees: function(employee_ids) {
        //   $.ajax({
        //     method: 'GET',
        //     url: bridgelyApp.apiUrl + '/v1/employees'
        //   })
        // },
        columns: [{
            name: "employee_ids",
            label: "Quantity",
            cell: Backgrid.StringCell.extend({
              render: function() {
                this.$el.empty();
                this.$el.html( this.formatter.fromRaw( this.model.get('employee_ids'), this.model.get('direction') ) )
                this.delegateEvents();
                return this;
              }
            }),
            formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
              fromRaw: function (employee_ids, direction) {
                console.log(direction);
                var verb = ( direction === 'inbound' ) ? 'Received' : 'Sent';
                if( employee_ids.length === 0) {
                  return $('<code />').text('0 ' + verb);
                } else {
                  return employee_ids.length + ' ' + verb;
                }
              }
            }),
            editable: false
          }, {
            name: "question",
            label: "Question",
            cell: Backgrid.StringCell.extend({
              render: function() {
                this.$el.empty();
                if( this.model.attributes.question ) {
                  this.$el.html( this.formatter.fromRaw( this.model.attributes.question ) )
                }
                this.delegateEvents();
                return this;
              }
            }),
            formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
              fromRaw: function (data) {
                return $('<a />').attr('href', '#question/' + data.id).text( data.title );
              }
            }),
            editable: false
          }, {
            name: "body",
            label: "Message",
            cell: "string",
            editable: false
          }
        ],
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