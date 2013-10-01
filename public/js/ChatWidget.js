define(['router'], function(router) {
	var initialize = function() {
		checkLogin(runApplication); // Check authentication status, then run app
	};

	var checkLogin = function(callBack) {
		$.ajax('/account/authenticated', {
			method: 'GET',
			success: function(){
				return callBack(true);
			},
			error: function(){
				return callBack(false);
			}
		});
	};

	var runApplication = function(authenticated) {
		if(!authenticated) {
			window.location.hash = 'login';
		} else {
			window.location.hash = 'index';
		}
		Backbone.history.start(); // This line boots up the router
	};

	return {
		initialize: initialize
	};
});