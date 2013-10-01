define(['views/index','views/register','views/login','views/forgotpassword'],
	function(IndexView, RegisterView, LoginView, ForgotPasswordView){
		var ChatWidgetRouter = Backbone.Router.extend({
			currentView: null,
			routes: {
				'index': 'index',
				'login': 'login',
				'register': 'register',
				'forgotPassword': 'forgotPassword'
			},

			changeView: function(view){
				if(null !== this.currentView) {
					this.currentView.undelegateEvents();
				}
				this.currentView = view;
				this.currentView.render();
			},

			index: function(){
				alert("i'm at index where r u");
				this.changeView(new IndexView());
			},

			login: function(){
				alert("gonna login");
				this.changeView(new LoginView());
			},

			forgotPassword: function(){
				this.changeView(new RegisterView());
			},

			register: function(){
				this.changeView(new RegisterView());
			}

		});
	return new ChatWidgetRouter();
});