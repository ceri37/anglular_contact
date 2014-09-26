define([
    'app',
    'models/contact',
    'services/storage'
], function(app, Contact) {

    return app.controller(
        'ListController',
        [
            '$scope',
            'storage',
            function($scope, storage) {

                $scope.contacts = storage.get("contacts", Contact);

            }
        ]
    );

});