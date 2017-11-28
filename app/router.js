module.exports = app => {
	app.router.get('/', 'home.index');
	app.router.group({
    prefix: '/api'
  }, router => {
  	router.post('/directory/create', 'directory.create');
  	router.post('/directory/traverse', 'directory.traverse');
  });
};