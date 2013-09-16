/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.QuestionRouter = Backbone.Router.extend({
      routes: {
        'question' : 'newQuestion',
        'question/:id' : 'viewQuestion',
        'question-history' : 'questionHistory'
      },
      newQuestion: function() {
        console.log('new question route');
      },
      viewQuestion: function(id) {
        if( id === undefined || !Number(id) ) {
          throw new Error('Route must be called with a valid id');
        } else {
          console.log('view question id: ' + id);
        }
      },
      questionHistory: function() {
        console.log('view question history route');
      }
    });

})();
