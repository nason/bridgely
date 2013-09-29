/*global bridgelyApp, Backbone, JST*/

// TODO: Consider backbone-relational, see https://gist.github.com/jdkanani/5822296

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.EmployeesView = Backbone.View.extend({

        initialize: function() {
          this.collection = new bridgelyApp.Collections.EmployeesCollection();

          this.grid = new Backgrid.Grid({
            className: 'table table-hover table-condensed backgrid',
            columns: this.columns,
            collection: this.collection
          });

          if( bridgelyApp.session.get('admin') && !bridgelyApp.session.get('company') ) {
            this.grid.insertColumn([{
              name: 'company_id',
              label: 'Company ID',
              cell: 'string',
              sortable: true,
              editable: false
            }]);
          }

          this.listenTo(this.collection, "change add sync", this.render);
          this.listenTo(this.grid, "change", this.render);

          this.collection.fetch();

          // Reset selected employees every time the directory page is navigated to
          bridgelyApp.session.resetNewMessageEmployeeIds();
        },
        tags: function() {
          var dataCol = this.collection.fullCollection.pluck('data'),
              keys = [];

          _.each(dataCol, function(data) {
            data.tags && _.each(_.keys(data.tags), function(key) {
              keys.push(key);
            })
          })

          return _.uniq(keys);
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
                var selected = false
                if( bridgelyApp.session.get('new_message_employee_ids') !== 'all' ) {
                  selected = bridgelyApp.session.get('new_message_employee_ids').indexOf(data.id) > -1
                }
                return $('<input type=checkbox />').attr('id', data.id).prop('checked', selected);
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
                return $('<a />').attr('href', '#').addClass(' employee employee-' + data.id).text( data.name );
              }
            }),
            editable: false
          }, {
            name: "phone",
            label: "Phone",
            cell: "string",
            editable: false
          }
        //   {
        //     name: "data",
        //     label: "Labels",
        //     cell: Backgrid.StringCell.extend({
        //       render: function () {
        //           this.$el.empty();
        //           var data = this.model.get('data');
        //           var labels = data.labels;

        //           labels && this.$el.html( this.formatter.fromRaw( labels ) );

        //           this.delegateEvents();
        //           return this;
        //       }
        //     }),
        //     formatter:  _.extend({}, Backgrid.CellFormatter.prototype, {
        //       fromRaw: function (data) {
        //         var output = [], data = data || [];
        //         _(data).each(function( label ) {
        //           output.push( '<span class="label label-default">' + escape(label) + '</span>' );
        //         })
        //         return output.join(' ');
        //       }
        //     }),
        //     editable: false,
        //     sortable: false
        // }
        ],
        template: JST['app/scripts/templates/employees.ejs'],
        events: {
          'click .employee' : 'viewEmployee',
          'click .boolean-cell input:checkbox' : 'check',
          'click .tag-list-item input:checkbox' : 'toggleTag',
          'click #sms-selected' : 'smsSelected',
          'click #question-selected' : 'questionSelected',
          'click #sms-all' : 'smsAll',
          'click #question-all' : 'questionAll'
        },
        viewEmployee: function() {
          event.preventDefault();
          var employeeId = event.target.className.split('-')[1];
          bridgelyApp.EmployeeRouter.navigate('employee/' + employeeId, {trigger: true});
        },
        check: function(event) {
          this.$('.send-selected').prop('disabled', false);
          if( event.target.checked ) {
            bridgelyApp.session.addNewMessageEmployeeId( parseInt(event.target.id) );
          } else {
            bridgelyApp.session.removeNewMessageEmployeeId( parseInt(event.target.id) );
            if ( bridgelyApp.session.get('new_message_employee_ids') === 'all' ) {
              this.$('.send-selected').prop('disabled', true);
            }
          }
        },
        toggleTag: function(event) {
          if( event.target.checked ) {
            // add column
            this.grid.insertColumn([{
              name: 'data',
              label: event.target.name,
              cell: 'string',
              formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                fromRaw: function (data) {
                  data.tags = data.tags || {};
                  return data.tags[event.target.name];
                }
              }),
              sortable: true,
              editable: false
            }]);
          } else {
            // remove column
            var tagCol = this.grid.columns.where({ label: event.target.name });
            this.grid.removeColumn(tagCol);
          }
        },
        smsSelected: function(event) {
          event.preventDefault();
          bridgelyApp.MessageRouter.navigate('message', {trigger:true});
        },
        questionSelected: function(event) {
          event.preventDefault();
          bridgelyApp.QuestionRouter.navigate('question', {trigger:true});
        },
        smsAll: function(event) {
          event.preventDefault();
          bridgelyApp.session.set('new_message_employee_ids', 'all');
          bridgelyApp.MessageRouter.navigate('message', {trigger:true});
        },
        questionAll: function(event) {
          event.preventDefault();
          bridgelyApp.session.set('new_message_employee_ids', 'all');
          bridgelyApp.QuestionRouter.navigate('question', {trigger:true});
        },
        render: function() {

          // Initialize the paginator
          var paginator = new Backgrid.Extension.Paginator({
            collection: this.collection
          });

          var employeeFilter = Backgrid.Extension.ClientSideFilter.extend({
            template: _.template('<input type="search" results=0 autocomplete="off" <% if (placeholder) { %> placeholder="<%- placeholder %>" <% } %> name="<%- name %>" /><a class="clear" href="#">&times;</a>'),
            makeMatcher: function (query) {
              var regexp = this.makeRegExp(query);
              return function (model) {
                var keys = this.fields || model.keys();
                for (var i = 0, l = keys.length; i < l; i++) {

                  // Search through tags in the data column
                  if(keys[i] === "data" && model.get(keys[i]).tags ) {
                    var employeeData = model.get(keys[i])
                    for(var tag in employeeData.tags) {
                      if( regexp.test( employeeData.tags[tag] + "" ) ) {
                        return true;
                      }
                    }
                  }

                  else if (regexp.test(model.get(keys[i]) + "")) {
                    return true;
                  }
                }
                return false;
              };
            }
          });

          var filter = new employeeFilter({
            className: 'form-search',
            placeholder: 'Filter Directory',
            collection: this.collection.fullCollection
          });

          $('#content').html( this.$el.html(this.template(this.collection)) );

          $('.backgrid-container').prepend(
            this.grid.render().$el
          ).append(
            paginator.render().$el
          );

          $('.grid-filter').html(
            filter.render().$el
          );

          this.delegateEvents();
          return this.el;
        }
    });
})();
