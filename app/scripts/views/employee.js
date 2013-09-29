/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.EmployeeView = Backbone.View.extend({
      model: bridgelyApp.Models.EmployeeModel,
      template: JST['app/scripts/templates/employee.ejs'],
      events: {
        'click .back' : 'back'
      },
      back: function() {
        event.preventDefault();
        bridgelyApp.DirectoryRouter.navigate('directory', {trigger: true});
      },
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

        if( this.model.get('messages') ) {
          _( this.model.get('messages').reverse() ).each(function(activity) {

            var $record = $('<div />').addClass("list-group-item");
            $record.append( $('<h4 />').addClass("list-group-item-heading").text(activity.message.body) );
            $record.append( $('<p />').addClass("list-group-item-text").text(activity.message.direction) );

            if( activity.question_id ) {
              var $question = $('<span />').addClass('pull-right');

              ( activity.message.direction === 'outbound' )
                ? $question.text('Asked: ')
                : $question.text('Answered: ');

              var $label = $('<a />').prop('href','#').addClass('question question-' + activity.question.id);
              $label.append( $('<span />').addClass('label label-default').text( activity.question.title ) );
              $question.append( $label )

              $record.find('.list-group-item-text').prepend( $question )
            }

            this.$('.messages').append( $record );

          }, this)
        }
        this.$('.preloader').hide()
        this.delegateEvents();
        return this.el;
      },
      getMessages: function() {
        var employee = this;
        $.ajax({
          method: 'GET',
          url: bridgelyApp.apiUrl + "/employees/" + this.model.id + "/messages",
          success: function(activityData) {
            employee.model.set('messages', activityData);
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
