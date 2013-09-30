module.exports = function(config, mongoose, nodeMailer) {
	var crypto = require('crypto');

	var AccountSchema = new mongoose.Schema({
		email: 		{ type: String, unique: true},
		password: 	{ type: String },
		name: {
			first: 	{ type: String },
			last: 	{ type: String }
		},
		birthday: 	{
			day: 	{ type: Number, min: 1, max: 31, required: false },
			month: 	{ type: Number, min: 1, max: 12, required: false },
			year: 	{ type: Number }
		},
		photoUrl: 	{ type: String },
		biography: 	{ type: String }
	});

	var Account = mongoose.model('Account', AccountSchema);

	var changePassword = function(accountId, newPassword) {
		var shaSum = crypto.createHash('sha256'),
			hashedPassword;

		shaSum.update(newPassword);
		hashedPassword = shaSum.digest('hex');

		Account.update({ _id: accountId }, {$set: {password:hashedPassowrd}},
			{upsert:false}, function changePasswordCallback(err){
				console.log('Change password done for account ' + accountId);
			});
	};

	var forgotPassword = function(email, resetPasswordUrl, callBack) {
		var user = Account.findOne({email: email}, function findAccount(err, doc){
			if (err) {
				// Email address is not a valid user
				callBack(false);
			} else {
				var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
				resetPasswordUrl += '?account=' + doc._id;
				smtpTransport.sendMail({
					from: 'thisapp@example.com',
					to: doc.email,
					subject: 'Chat Widget Password Reset',
					text: 'Click here to reset your password: ' + resetPasswordUrl
				}, function forgotPasswordResult(err){
					if (err) {
						callBack(false);
					} else {
						callBack(true);
					}
				});
			}
		});
	};

	var login = function(email, password, callBack) {
		var shaSum = crypto.createHash('sha256');
		shaSum.update(password);
		Account.findOne({email: email, password: shaSum.digest('hex')}, function(err, doc){
			callBack(null!=doc);
		});
	};

	var registerCallback = function(err) {
		if (err) {
			return console.log(err);
		};
		return console.log('Account was created');
	};

	var register = function(email, password, firstName, lastName) {
		var shaSum = crypto.createHash('sha256');
		shaSum.update(password);

		console.log('Registering ' + email);

		var user = new Account({
			email: email,
			name: {
				first: firstName,
				last: lastName
			},
			password: shaSum.digest('hex');
		});
		user.save(registerCallback);
		console.log('Save command was sent');
	};

	return {
		register: register,
		forgotPassword: forgotPassword,
		changePassword: changePassword,
		login: login,
		Account: Account
	}

}