/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.QuestionRouter = Backbone.Router.extend({
      requireLogin : function(ifYes) {
        if (bridgelyApp.session.authenticated()) {
          if (_.isFunction(ifYes)) ifYes.call(this);
        } else {
          bridgelyApp.LoginRouter.navigate('login', {trigger: true})
        }
      },
      routes: {
        'question' : 'newQuestion',
        'question/:id' : 'viewQuestion',
        'question-history' : 'questionHistory'
      },
      newQuestion: function() {
        this.requireLogin(function() {
          new bridgelyApp.Views.newQuestionView().render();
        })
      },
      viewQuestion: function(id) {
        this.requireLogin(function() {
          if( id === undefined || !Number(id) ) {
            throw new Error('Route must be called with a valid id');
          } else {
            var question = new bridgelyApp.Models.QuestionModel({id: id})
            new bridgelyApp.Views.QuestionView({model: question});
          }
        })
      },
      questionHistory: function() {
        console.log('view question history route');
      }
    });

})();
