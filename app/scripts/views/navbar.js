/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.NavbarView = Backbone.View.extend({
        template: JST['app/scripts/templates/navbar.ejs'],
        el: $('<nav role="navigation" />'),
        events: {
          'click .home': 'home',
          'click .account' : 'settings',
          'click .directory' : 'directory',
          'click .login' : 'signIn',
          'click .logout' : 'signOut',
          'click .new-message' : 'newMessage',
          'click .new-question' : 'newQuestion',
          'click .message-history' : 'messageHistory',
          'click .admin-users' : 'adminUsers',
          'click .admin-companies' : 'adminCompanies'
        },
        home: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.IndexRouter.navigate('', {trigger: true});
        },
        settings: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.IndexRouter.navigate('settings', {trigger: true});
        },
        directory: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.DirectoryRouter.navigate('directory', {trigger: true});
        },
        newMessage: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.MessageRouter.navigate('message', {trigger: true})
        },
        newQuestion: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.QuestionRouter.navigate('question', {trigger: true})
        },
        messageHistory: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.MessageRouter.navigate('message-history', {trigger: true})
        },
        adminUsers: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.AdminRouter.navigate('admin/users', {trigger:true});
        },
        adminCompanies: function() {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.AdminRouter.navigate('admin/companies', {trigger:true});
        },
        signIn: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.LoginRouter.navigate('login', {trigger: true});
        },
        signOut: function(event) {
          event.preventDefault();
          this.toggleSelected();
          bridgelyApp.session.logout();
        },
        toggleSelected: function() {
          // TODO: Call this on route event?
          this.$('.active').removeClass('active');
          $(event.target.parentElement).addClass('active');
        },
        render: function() {
          this.$el.addClass("navbar navbar-default container");
          this.$el.html( this.template() );
          this.delegateEvents();
        },
        initialize: function() {
          this.render();

          // Re-render when the session changes
          bridgelyApp.session.on('change', function() {
            this.render();
          }, this);
        }

    });

})();
