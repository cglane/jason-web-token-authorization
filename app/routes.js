var User = require("./models/user");

module.exports = function (apiRoutes) {

  apiRoutes.get('/', function(req, res) {
  	res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  apiRoutes.get('/users', function(req, res) {
  	User.find({}, function(err, users) {
  		res.json(users);
  	});
  });

  apiRoutes.get('/check', function(req, res) {
  	res.json(req.decoded);
  });
}
