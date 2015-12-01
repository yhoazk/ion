angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.status = {
      submitEnabled :true
  };
  $scope.submitReport = function ($scope, $state) {
    console.log("submitEnabled <- true");
    //$state.go('tab.dash');
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})



.controller("SignInCtrl", function($scope, $state) {
    $scope.signIn = function(user){
    console.log("Sign-in: ", user);
    $state.go('tab.dash');
  };

    $scope.createAccount = function(user){
      console.log("Create Account: ", user);
      $state.go('tab.dash');
    };
})

.controller("CameraCtrl", function($scope, $cordovaCamera) {

    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

})

.controller('LoginCtrl', function($scope, $stateParams, Chats,$cordovaToast) {
  $scope.loginfnc = function () {
    $cordovaToast
   .show('Here is a message', 'long', 'center')
   .then(function(success) {
     // success
   }, function (error) {
     // error
   });

  }
})




.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})



.controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
})

.controller('MapsCtrl', function($scope, $ionicLoading){

    $scope.mapCreated = function(map){
        console.log("Mapa aceptado");
        $scope.map = map;
        }
    $scope.centerOnMe = function() {
        if(!$scope.map){
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: true
            });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });

    };


    /* Version 2
   console.log('map', 'reached that far controller being called');

    google.maps.event.addDomListener(window, 'load', function() {

        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $rootScope.map = map;
        $scope = map;
    });

console.log(map.toString(), ' that far controller being called');
*/
});


// Re-usable $splash module
angular.module('ui.splash', ['ui.bootstrap', 'ngAnimate'])
.service('$splash', [
  '$uibModal',
  '$rootScope',
  function($uibModal, $rootScope) {
    return {
      open: function (attrs, opts) {
        var scope = $rootScope.$new();
        angular.extend(scope, attrs);
        opts = angular.extend(opts || {}, {
          backdrop: false,
          scope: scope,
          templateUrl: 'splash/content.html',
          windowTemplateUrl: 'splash/index.html'
        });
        return $uibModal.open(opts);
      }
    };
  }
])
.run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('splash/index.html',
      '<section modal-render="{{$isRendered}}" class="splash" modal-in-class="splash-open" ng-style="{\'z-index\': 1000, display: \'block\'}" ng-click="close($event)">' +
      '  <div class="splash-inner" ng-transclude></div>' +
      '</section>'
    );
    $templateCache.put('splash/content.html',
      '<div class="splash-content text-center">' +
      '  <h1 ng-bind="title"></h1>' +
      '  <p class="lead" ng-bind="message"></p>' +
      '  <button class="btn btn-lg btn-outline" ng-bind="btnText || \'Ok, cool\'" ng-click="$close()"></button>' +
      '</div>'
    );
  }
]);
