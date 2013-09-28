/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminCompanyTopbar = Backbone.View.extend({

        template: JST['app/scripts/templates/adminCompanyTopbar.ejs'],
        events: {
          'click .admin-return' : 'clearAdminCompany'
        },
        clearAdminCompany: function() {
          $('#topbar').empty();
          bridgelyApp.session.set('company', null);
          bridgelyApp.AdminRouter.navigate('admin/companies', {trigger: true});
        },
        render: function() {
          $('#topbar').empty();
          this.$el.html( this.template )
                  .addClass('panel panel-danger admin-topbar');
          this.delegateEvents();
          return this.el
        },
        initialize: function() {
          $('#topbar').append ( this.render() );
        }

    });

})();
