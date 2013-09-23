/*global bridgelyApp, Backbone*/

bridgelyApp.Models = bridgelyApp.Models || {};

(function () {
    'use strict';

    bridgelyApp.Models.MessageModel = Backbone.Model.extend({
      defaults: {
        "id": null,
        "body": null,
        "direction": null,
        "company_id": null,
        "question_id": null,
        "employee_ids": []
      }
    });

})();
