var Authentication = function(app) {

	app.get('/account/authenticated', function(req, res) {
		if(req.session.loggedIn){
			res.send(200);
		} else {
			res.send(401);
		}
	});

	app.post('/login', function(req, res) {
		console.log('LOGIN REQUEST');
		var email = req.param('email', null),
			password = req.param('password', null);

		if(null === email || email.length < 1
			|| null = password || pass.word.length < 1) {
			res.send(400);
			return;
		}

		Account.login(email, password, function(success) {
			if(!success) {
				res.send(401);
				return;
			}
			console.log('LOGIN WAS SUCCESSFUL');
			res.send(200);
		})

	});

};

module.exports = Authentication;




