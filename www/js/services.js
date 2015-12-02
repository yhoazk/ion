angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Reporte #1',
    lastText: 'Esto no queda hoy',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Reporte #2',
    lastText: 'Esto no quedo este sexenio',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Reporte #ABCE',
    lastText: 'Mi mama me mima mi mama',
    face: 'img/map.png'
  }, {
    id: 3,
    name: 'Reporte #231',
    lastText: 'La sinceridad siempre nos llevará a odiarnos un poco',
    face: 'img/adam.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
