

http://www.joshmorony.com/part-1-using-the-http-service-in-ionic-to-dynamically-load-google-map-markers/

http://www.sitepoint.com/creating-location-sharing-app-using-ionic-framework/


http://localhost:8101/css/style.css


https://github.com/driftyco/ionic/issues/3452

The call to the function childLinkFn at line 15364 in the ionic.bundle receives an undefined node when you have markup like the following:

<ion-view title="{{map_name}}"> <ion-content has-header="true" padding="true" scroll="false" data-tap-disabled="true"> <div id="the_map"> <h4><ion-spinner></ion-spinner>&nbsp;&nbsp;Henter butiksdata ...</h4> </div> </ion-content> </ion-view>

The solution is to not use the <h4>...</h4> tags like so:

<ion-view title="{{map_name}}"> <ion-content has-header="true" padding="true" scroll="false" data-tap-disabled="true"> <div id="the_map"> <ion-spinner></ion-spinner>&nbsp;&nbsp;Henter butiksdata ... </div> </ion-content> </ion-view>

I close the issue as there is a workaround but will consider it reported for the team to handle at some convenient time.


Para agragar la camara:

correr tabmien
>bower install ngCordova
> cordova plugin add org.apache.cordova.camera


en index agregar el script
<script src="js/ng-cordova.min.js"></script>

Agregar la dependencia en la app
```javascript
angular.module('starter', ['ionic', 'ngCordova'])
```

Agregar el siguiente controlador:

```javascript

exampleApp.controller("ExampleController", function($scope, $cordovaCamera) {

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
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

});
```

agregar el sigiente view
```html
<ion-content ng-controller="ExampleController">
    <img ng-show="imgURI !== undefined" ng-src="{{imgURI}}">
    <img ng-show="imgURI === undefined" ng-src="http://placehold.it/300x300">
    <button class="button" ng-click="takePicture()">Take Picture</button>
</ion-content>
```

http://devdactic.com/how-to-capture-and-store-images-with-ionic/
## ionic store local data

correr el cmd en el root del prj
```
cordova plugin add cordova-plugin-file
```

Asegurarse que el script `ng-cordova.js` está en `index.html`
y que se añade como dependencia en el app.js
```javascript
angular.module('starter', ['ionic', 'ngCordova'])
```
