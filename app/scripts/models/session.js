/*global bridgelyApp, Backbone*/

// TODO: Setup a 'authenticated' event?

bridgelyApp.Models = bridgelyApp.Models || {};

(function () {
    'use strict';

    bridgelyApp.Models.SessionModel = Backbone.Model.extend({
      defaults: {
        "name": null,
        "email": null,
        "admin": false,
        "company": null,
        "auth_token":  null,
        "new_message_employee_ids": 'all'
      },
      url: function() {
        return bridgelyApp.apiUrl + '/auth';
      },
      initialize: function( ) {
        this.storage = localStorage;
        this.load();
      },
      authenticated: function() {
        return !!this.get('auth_token');
      },
      login: function(email, password) {
        var session = this;
        $.ajax({
          type: 'POST',
          url: this.url()+'/login',
          data: {session: {email: email, password: password}},
          success: function(data) {
            if(data.admin === true) {
              this.admin = true;
            }
            session.save(data);
            session.load();

            (this.admin)
              ? bridgelyApp.appView.trigger('admin-authenticated')
              : bridgelyApp.appView.trigger('authenticated');
          },
          error: function() {
            session.trigger('authentication-error');
          }
        });
      },
      logout: function() {
        if (this.authenticated()) {
          var session = this;
          $.ajax({
            type: 'DELETE',
            url: this.url()+'/logout',
            complete: function() {
              session.destroy();
              bridgelyApp.appView.trigger('unauthenticate');
            }
          });
        }
      },
      save: function(data) {
        // Save the auth_token into browser localstorge / cookie
        this.storage.setItem('session', JSON.stringify(data) );
      },
      load : function() {
        // Load from browser localstorge / cookie into model
        if ( this.storage.length > 0 && this.storage.getItem('session') ) {
          var session = JSON.parse( this.storage.getItem('session') );
          this.set({
            "name": session.name,
            "email": session.email,
            "admin": session.admin,
            "company": session.company,
            "auth_token":  session.authorization_token
          })
        } else {
          return;
        }
      },
      destroy: function() {
        this.storage.clear();
        this.set({
          "name": null,
          "email": null,
          "admin": false,
          "company": null,
          "auth_token":  null,
          "new_message_employee_ids": 'all'
        });
      },
      addNewMessageEmployeeId: function(id) {
        var ids = this.get('new_message_employee_ids');
        if( ids === 'all') {
          ids = [];
        }
        ids.push(id)
        this.set('new_message_employee_ids', ids)
      },
      removeNewMessageEmployeeId: function(id) {
        var ids = this.get('new_message_employee_ids');
        if(ids === 'all' || ids === [] || ids.indexOf(id) === -1 ) {
          throw new Error('Cannot remove employee id');
        } else {
          var new_ids = _(ids).without(id);
          if( new_ids.length === 0 ) {
            new_ids = 'all';
          }
          this.set('new_message_employee_ids', new_ids );
        }
      },
      resetNewMessageEmployeeIds: function() {
        this.set('new_message_employee_ids', 'all');
      }
    });

})();
