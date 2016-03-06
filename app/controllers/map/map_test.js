'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.map'));

  describe('map controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var mapCtrl = $controller('MapCtrl');
      expect(mapCtrl).toBeDefined();
    }));

  });
});
