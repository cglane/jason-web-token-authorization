
function checkUsers(req,res){
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if(user){
      res.send({success: false, msg: 'Username already exists.'});
    }
  })
}
module.exports = function(app,user,publicFolder){
  app.post('/register', function(req, res) {

  	// create a sample user
  	var nick = new User({
  		name: req.body.name,
  		password: req.body.password,
  		admin: true
  	});
  	nick.save(function(err) {
  		if (err) throw err;

  		console.log('User saved successfully');
  		res.json({ success: true });
  	});
  });

  // basic route (http://localhost:8080)
  app.get('/', function(req, res) {
  	res.send('Hello! The API is at http://localhost:' + port + '/api');
  });
  app.get('*', function (req, res) {
      res.sendFile(publicFolder); // load the single view file (angular will handle the page changes on the front-end)
  });
}
