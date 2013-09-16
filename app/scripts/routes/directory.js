/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.DirectoryRouter = Backbone.Router.extend({
      routes: {
        directory : 'directory',
        'directory/:page' : 'directory'
      },
      directory: function(page) {
        // router sends params as string
        // check if string is a number, otherwise default to 0
        if( page === undefined || !Number(page) ) {
          page =  0;
        }
        console.log('directory route page ' + page)

        $('#content').html( new bridgelyApp.Views.EmployeesView().render() )
      }

    });

})();
