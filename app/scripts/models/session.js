/*global bridgelyApp, Backbone*/

// TODO: Setup a 'authenticated' event?

bridgelyApp.Models = bridgelyApp.Models || {};

(function () {
    'use strict';

    bridgelyApp.Models.SessionModel = Backbone.Model.extend({
      defaults: {
        "name": null,
        "email": null,
        "company": null,
        "auth_token":  null
      },
      url: function() {
        return bridgelyApp.apiUrl + '/auth';
      },
      initialize: function( ) {
        this.storage = localStorage;
        this.load();
      },
      authenticated: function() {
        // console.log('Authenticated:', !!this.get('auth_token') )
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
              // TODO trigger an admin authentication event?
            }
            session.save(data);
            session.load();
            bridgelyApp.appView.trigger('authenticated');
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
              bridgelyApp.LoginRouter.navigate('', {trigger: true})
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
          "company": null,
          "auth_token":  null
        });
      }
    });

})();
