var db = require('mongoose');
var Schema = db.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
	username:String,
	name : String,
	email: String,
	pass: String
});
user.plugin(passportLocalMongoose)
module.exports= db.model('users',user);
