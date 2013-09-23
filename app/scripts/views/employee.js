/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.EmployeeView = Backbone.View.extend({

      template: JST['app/scripts/templates/employee.ejs'],
      render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this.el;
      }

    });

})();
