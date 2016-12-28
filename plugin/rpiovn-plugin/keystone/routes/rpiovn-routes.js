var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api') 
};

module.exports = function(app) {

  //Views
  app.get('/createaccount', routes.views.createaccount);
  app.get('/contactus', routes.views.contactus);
  
  //Log Work Route
  app.get('/api/logwork/list/all', keystone.middleware.api, routes.api.logwork.listall);
  app.get('/api/logwork/list/last50', keystone.middleware.api, routes.api.logwork.listlast50);
  app.get('/api/logwork/:id', keystone.middleware.api, routes.api.logwork.get);
  app.all('/api/logwork/:id/update', keystone.middleware.api, routes.api.logwork.update);
  app.all('/api/logwork/create', keystone.middleware.api, routes.api.logwork.create);
  app.get('/api/logwork/:id/remove', keystone.middleware.api, routes.api.logwork.remove);
  
  //Project Info API
  app.get('/api/projects/list', keystone.middleware.api, routes.api.projects.list);
  app.get('/api/projects/:id', keystone.middleware.api, routes.api.projects.get);
  app.all('/api/projects/:id/update', keystone.middleware.api, routes.api.projects.update);
  app.all('/api/projects/create', keystone.middleware.api, routes.api.projects.create);
  app.get('/api/projects/:id/remove', keystone.middleware.api, routes.api.projects.remove);
  
  //Users API
  app.get('/api/users/list', keystone.middleware.api, routes.api.users.list);
  app.get('/api/users/:id', keystone.middleware.api, routes.api.users.get);
  app.all('/api/users/:id/update', keystone.middleware.api, routes.api.users.update);
  app.all('/api/users/create', keystone.middleware.api, routes.api.users.create);
  app.get('/api/users/:id/remove', keystone.middleware.api, routes.api.users.remove);
  
  //Email API
  app.all('/api/email/send', keystone.middleware.api, routes.api.email.send);
  
  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
  app.get('/logwork', middleware.requireUser, routes.views.logwork);
}