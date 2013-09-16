/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.MessageRouter = Backbone.Router.extend({
      routes: {
        'message' : 'newMessage',
        'message/:id' : 'viewMessage',
        'message-history' : 'messageHistory'
      },
      newMessage: function() {
        console.log('new message route!!');
        $('#content').html( new bridgelyApp.Views.newMessageView().render() )
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
      }

    });

})();
