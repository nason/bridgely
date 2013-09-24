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
          bridgelyApp.session.resetNewMessageEmployeeIds();
        },
        columns: [{
            name: 'selected',
            label: '',
            cell: Backgrid.BooleanCell.extend({
              render: function() {
                this.$el.empty();
                this.$el.html( this.formatter.fromRaw( this.model.attributes ) );
                this.delegateEvents();
                return this;
              }
            }),
            formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
              fromRaw: function(data) {
                return $('<input type=checkbox />').attr('id', data.id)
              }
            }),
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
        events: {
          'click #sms-selected' : 'smsSelected',
          'click #question-selected' : 'questionSelected',
          'click #sms-all' : 'smsAll',
          'click #question-all' : 'questionAll'
        },
        smsSelected: function(event) {
          event.preventDefault();

          var ids = _(this.$('.boolean-cell input:checked')).map( function(box){
            return parseInt(box.id);
          });
          if(ids.length) {
            bridgelyApp.session.set('new_message_employee_ids', ids);
          }
          bridgelyApp.MessageRouter.navigate('message', {trigger:true});
        },
        questionSelected: function(event) {
          event.preventDefault();

          var ids = _(this.$('.boolean-cell input:checked')).map( function(box){
            return parseInt(box.id);
          });
          if(ids.length) {
            bridgelyApp.session.set('new_message_employee_ids', ids);
          }
          bridgelyApp.session.set('new_message_employee_ids', ids);
          bridgelyApp.QuestionRouter.navigate('question', {trigger:true});
        },
        smsAll: function(event) {
          event.preventDefault();
          bridgelyApp.MessageRouter.navigate('message', {trigger:true});
        },
        questionAll: function(event) {
          event.preventDefault();
          bridgelyApp.QuestionRouter.navigate('question', {trigger:true});
        },
        render: function() {

          // Initialize the paginator
          var paginator = new Backgrid.Extension.Paginator({
            collection: this.collection
          });

          $('#content').html( this.$el.append(this.template) );

          $('.backgrid-container').prepend(
            this.employeesGrid().render().$el
          ).append(
            paginator.render().$el
          );

          this.delegateEvents();
          return this;
        }
    });
})();
