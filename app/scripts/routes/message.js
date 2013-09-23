/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.MessageRouter = Backbone.Router.extend({
      requireLogin : function(ifYes) {
        if (bridgelyApp.session.authenticated()) {
          if (_.isFunction(ifYes)) ifYes.call(this);
        } else {
          bridgelyApp.LoginRouter.navigate('login', {trigger: true})
        }
      },
      routes: {
        'message' : 'newMessage',
        'message/:id' : 'viewMessage',
        'message-history' : 'messageHistory'
      },
      newMessage: function() {
        console.log('new message route!!');
        this.requireLogin(function() {
          new bridgelyApp.Views.newMessageView().render();
        })
      },
      viewMessage: function(id) {
        if( id === undefined || !Number(id) ) {
          throw new Error('Route must be called with a valid id');
        } else {
          console.log('View message id: ' + id);
        }
      },
      messageHistory: function() {
        console.log('message history route');
        this.requireLogin( function() {
          // router sends params as string
          // check if string is a number, otherwise default to 0
          new bridgelyApp.Views.MessagesView().render();
        });
      }

    });

})();
