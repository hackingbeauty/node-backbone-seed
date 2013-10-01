var Registration = function(config, mongoose, nodeMailer) {
	app.post('/register', function(req, res) {
		var firstName = req.param('firstName', ''),
			lastName = req.param('lastName',''),
			email = req.param('email', null),
			password = req.param('password', null);

		if(email === null || password === null){
			res.send(400);
			return;
		}

		Account.register(email, password, firstName, lastName);
		res.send(200);

	});
});

module.exports = Registration;