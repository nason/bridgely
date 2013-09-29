/*global bridgelyApp, Backbone*/

bridgelyApp.Models = bridgelyApp.Models || {};

(function () {
    'use strict';

    bridgelyApp.Models.QuestionModel = Backbone.Model.extend({
      defaults: {
        "id": null,
        "title": null,
        "message": null,
        "employees": null
      },
      url: function() {
        return bridgelyApp.apiUrl + '/questions/' + this.id
      }
    });

})();
