/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.EmployeeView = Backbone.View.extend({
      model: bridgelyApp.Models.EmployeeModel,
      template: JST['app/scripts/templates/employee.ejs'],
      render: function() {

        $('#content').html( this.$el );
        this.$el.html(this.template()).addClass('list-group');

        if( this.model.get('data') && this.model.get('data').tags ) {

          $('.tags').append(
            _(this.model.get('data').tags).map(function(value, tag) {
              var $tag = $('<span />').text(" "+ value + " ");
              var $label = $('<span />').addClass('label label-default').text(tag + ":");
              $tag.prepend($label);
              return $tag
            })
          );
        }

        this.delegateEvents();
        return this.el;
      },
      getMessages: function() {
        $.ajax({
          method: 'GET',
          url: bridgelyApp.apiUrl + "/employees/" + this.model.id + "/messages",
          success: function(activityData) {
            _(activityData).each(function(activity) {
              // if activity.message.question - do stuff with activity.question

              var $record = $('<div />').addClass("list-group-item");
              $record.append( $('<h4 />').addClass("list-group-item-heading").text(activity.message.body) );
              $record.append( $('<p />').addClass("list-group-item-text").text(activity.message.direction + ' / ' + activity.sms_status) )
              $('.messages').append( $record );
            })
          }
        })
      },
      initialize: function() {
        this.model.fetch();
        this.getMessages();

        this.render();
        this.model.on('sync change', this.render, this);
      },

    });

})();
