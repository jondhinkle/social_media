const publicRoutes = {
  'GET /users': 'UserController.getUsers',
  'GET /users/:id': 'UserController.getUser',
  'GET /users/:id/friends': 'UserController.getFriends',
  'POST /register': 'LoginController.register',
  'POST /login': 'LoginController.login',
  'POST /validate': 'LoginController.validate',
};

module.exports = publicRoutes;
