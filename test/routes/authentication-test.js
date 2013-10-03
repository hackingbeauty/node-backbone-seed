var assert 	= require('assert'),
	request = require('request'),
	app 	= require('../../server')l

// describe('Authentication', function(){
// 	before(function(){

// 	});

// 	describe('GET /login', function(){

// 		it('has a user field', function(){
// 			assert.equal(true, true);
// 		});

// 	});
// });

var assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})