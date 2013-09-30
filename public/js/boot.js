require.config({
	paths: {
		jQuery: '/js/libs/jquery-10.2',
		Underscore: '/js/libs/underscore-1.5.2',
		Backbone: '/js/libs/backbone-1.0.0',
		text: '/js/libs/text',
		templates: '../templates'
	},
	shim: {
		'Backbone': ['Underscore', 'jQuery'],
		'ChatWidget': ['Backbone']
	}
});

require(['ChatWidget'], function(ChatWidget) {
	ChatWidget.initialize();
});