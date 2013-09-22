/*global bridgelyApp, Backbone*/

// TODO: Setup a 'authenticated' event?

bridgelyApp.Models = bridgelyApp.Models || {};

(function () {
    'use strict';

    bridgelyApp.Models.SessionModel = Backbone.Model.extend({
      defaults: {
        "user_id":  null,
        "name":  null,
        "email": null,
        "auth_token":  null,
        "company":  null
      },
      url: function() {
        return this.options.host + '/v1/auth';
      },
      options: {
        host: "http://localhost:3000",
        store: null
      },
      initialize: function( options ) {
        // _.bindAll(this);
        options = options || {};
        this.options = _.extend(this.options, options);

        if( typeof localStorage != "undefined" && localStorage !== null ){
          // choose localStorage
          this.options.store = localStorage;
        } else {
          // otherwise we need to store data in a cookie
          this.options.store = $.cookie;
        }
        this.load();

      },
      authenticated: function() {
        return !!this.get('auth_token');
      },
      login: function(email, password, options) {
        // use options to facilitate onAuthenticated and onNotAuthenticated callbacks
        var session = this;
        $.ajax({
          type: 'POST',
          url: this.url()+'/login',
          data: {session: {email: email, password: password}},
          success: function(data) {
            console.log(data);
            session.store( data.account.id, data.auth_token );
          }
        });
      },
      logout: function() {
        if (this.authenticated()) {
          delete this.options.store.i;
          delete this.options.store.t;
          this.set({
            auth_token : null,
            user_id : null
          });
          // TODO send delete to server
        }
      },
      store: function(user_id, auth_token) {
        // Save the auth_token into browser localstorge / cookie
        // $.cookie('auth_token', auth_token)
        this.options.store.setItem('t', auth_token );
        this.options.store.setItem('i', user_id );
      },
      load : function() {
        // Load the above from browser localstorge / cookie
        if (this.options.store.getItem('t') && this.options.store.getItem('i')) {
          this.set({
            auth_token : this.options.store.getItem('t'),
            user_id : this.options.store.getItem('i')
          });
        } else {
          return false;
        }
      }
    });

})();
