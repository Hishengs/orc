module.exports = app => {
	app.router.get('/', 'home.index');
	app.router.group({
    prefix: '/api'
  }, router => {
  	router.post('/directory/create', 'directory.create');
  	router.post('/directory/traverse', 'directory.traverse');
  	router.post('/directory/remove', 'directory.remove');
  	router.post('/directory/rename', 'directory.rename');

  	router.post('/file/create', 'file.create');
  	router.post('/file/remove', 'file.remove');
  	router.post('/file/rename', 'file.rename');
  });
};