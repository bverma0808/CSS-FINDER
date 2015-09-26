/**
 This JS file contains client side code in AngularJS
 which performs the logic for filtering the classes
 based on the user's query. It does two works:
 i. Fetches the classes HashMap from the server
 ii.Finds the most relevant classes from them and displays
 them to user
 */

var cssMatcherApp = angular.module('cssMatcherApp', ['ngRoute']);

cssMatcherApp.factory('ConfigService', [
  function() {
    return {
        hostName: "http://localhost:8081"
    };
  }
]);


cssMatcherApp.controller("CssController", ['$scope','$http','ConfigService',
    function ($scope, $http, ConfigService) {

        $scope.similarClasses = {}

        $scope.cssFileProperties = {}

        $scope.cssClassObject = {}

        $scope.cssStyleText = ""

        /*
         * Fetch initial objects from server
         * */
        $scope.initObjects = function () {
            $scope.fetchCssFileProperties()
            $scope.fetchCssClassProperties()

        }


        /**
         * This method fetches the CSS object which is present in very efficient DataStructure
         * on the server, this method is called only once , and that is on client loading time
         */
        $scope.fetchCssFileProperties = function () {

            $http.get(ConfigService.hostName + '/fetchCssPropertyObject').success(function (response) {

                $scope.cssFileProperties = response;

                console.log($scope.cssFileProperties);

            });
        }


        /**
         * This method fetches the CSS object based on class-property mapping which is present in very efficient DataStructure
         * on the server, this method is called only once , and that is on client loading time
         */
        $scope.fetchCssClassProperties = function () {

            $http.get(ConfigService.hostName + '/fetchCssClassObject').success(function (response) {

                $scope.cssClassObject = response;

                console.log($scope.cssClassObject);

            });
        }

        $scope.addRelevanceScore = function () {
            console.log($scope.similarClasses.length)
            console.log($scope.similarClasses)
            for (var similarClassName in $scope.similarClasses) {
                var similarClass = $scope.similarClasses[similarClassName]
                console.log(similarClass)
                var classDefinitionArr = $scope.cssClassObject[similarClass.className]
                var relevanceScoreBasedOnPropertyCount = ($scope.cssStyleArr.length * 0.5) / classDefinitionArr.length
                relevanceScoreBasedOnPropertyCount = relevanceScoreBasedOnPropertyCount > 0.5 ? 0.5 : relevanceScoreBasedOnPropertyCount
                console.log(similarClass.weightage)
                console.log(relevanceScoreBasedOnPropertyCount)

                similarClass.weightage += relevanceScoreBasedOnPropertyCount;
            }
        }


        /**
         * This method finds the CSS classes which are most relevant to the User's query
         */
        $scope.findCssMatch = function () {

            $scope.similarClasses = {};
            console.log($scope.cssStyleText.length - 1)
            var styleString = $scope.cssStyleText
            if ($scope.cssStyleText[$scope.cssStyleText.length - 1] == ";") {
                styleString = $scope.cssStyleText.substring(0, $scope.cssStyleText.length - 1)
            }

            $scope.cssStyleArr = styleString.split(';');

            for (var i = 0; i < $scope.cssStyleArr.length; i++) {
                var propertyKey = $scope.cssStyleArr[i].split(":")[0];
                var propertyValue = $scope.cssStyleArr[i].split(":")[1];
                if ($scope.cssFileProperties[propertyKey]) {
                    $scope.propertyMatched($scope.cssFileProperties[propertyKey], propertyValue);
                }
            }

            $scope.addRelevanceScore();
            $scope.copySimilarClassesToArr()

        }


        $scope.sortedSimilarClassesArr = []

        $scope.copySimilarClassesToArr = function () {
            $scope.sortedSimilarClassesArr = []
            for (var similarClassName in $scope.similarClasses) {
                var similarClass = $scope.similarClasses[similarClassName];
                $scope.sortedSimilarClassesArr.push(similarClass)
            }
            console.log($scope.sortedSimilarClassesArr)
        }



        /**
         * This method finds how much fraction of the property has matched
         * whether its a 100% match (means both 'propertyName' & 'propertyValue')
         * are matched, OR its a 50% match (means only 'propertyName' match)
         * @param valueArr
         * @param propertyValue
         */
        $scope.propertyMatched = function (valueArr, propertyValue) {
            for (var i = 0; i < valueArr.length; i++) {
                if (valueArr[i].value.trim() == propertyValue.trim()) {
                    $scope.updateResultArray(valueArr[i].class, 0.5)
                } else {
                    $scope.updateResultArray(valueArr[i].class, 0.15)
                }
            }
        }


        /**
         * This method
         * @param className
         * @param weightage
         */
        $scope.updateResultArray = function (className, weightage) {
            var classDefinition = $scope.getClassDefinition(className)

            if ($scope.similarClasses[className] == undefined) {
                $scope.similarClasses[className] = {
                    className: className,
                    weightage: weightage,
                    classDefinition: classDefinition
                };
            }
            else {
                $scope.similarClasses[className].weightage += weightage;
            }
        }

        $scope.getClassDefinition = function (className) {
            var classDefinitionArr = $scope.cssClassObject[className]
            var classDefinitionStr = "{"
            for (var i = 0; i < classDefinitionArr.length; i++) {
                classDefinitionStr += classDefinitionArr[i].property + ':' + classDefinitionArr[i].value + ";"
            }
            classDefinitionStr += "}"
            return classDefinitionStr
        }
    }

]);