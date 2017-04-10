var myApp = angular.module('myApp', []);

myApp.controller('MessageController', ['$scope', 'DataService', function($scope, DataService){
  console.log('MessageController loaded!');

  $scope.messageArray = DataService.messageObject.messages;
  $scope.getMessages = DataService.getData;

  $scope.sendMessage = function(message){
    var postData = DataService.postData;
    postData(message);
  };

}]);


myApp.factory('DataService', ['$http', function($http){
    var messageObject = {
      messages : []
    };

    function getData(){
      $http.get('/messages').then(function(response){
        messageObject.messages.push(response.data);
      });
    }

    function postData(message){
      $http.post('/messages', message).then(function(response){
        getData();
      });
    }

    return {
      messageObject : messageObject,
      getData  : getData,
      postData : postData
    };
}]);
