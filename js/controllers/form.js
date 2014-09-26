define([
    'app',
    'models/contact',
    'services/storage'
], function(app, Contact) {

    return app.controller(
        'FormController',
        [
            '$scope',
            '$routeParams',
            '$location',
            'storage',
            function($scope, $routeParams, $location, storage) {

                var targetID = $routeParams && parseInt($routeParams.id, 10),
                    isNew = !(!isNaN(targetID) && targetID > 0);

                $scope.target = isNew ? new Contact() : storage.getByID("contacts", targetID);
                $scope.isNew = isNew;

                $scope.save = function() {
                    if ($scope.targetForm.$valid) {
                        !isNew ? storage.save('contacts') : storage.add('contacts', $scope.target);
                        $scope.back();
                    } else {
                        alert("Data is invalid");
                    }
                };

                $scope.back = function() {
                    $location.url("/");
                };

            }
        ]
    );

});