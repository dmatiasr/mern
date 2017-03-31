var userModel= require('../models/user');


	exports.addU= function (pname,pemail,pass, callback){

	 	var addUserModel = new userModel({
	 		name : pname,
	 		email: pemail,
	 		pass : pass
	 	});
		console.log(addUserModel);
		 	addUserModel.save(function (err) {
	 		if (!err){
	 			console.log('usuario guardado');
	 			ok='ok';
	 			callback(err,ok);
	 		}
	 		else{
				console.log('usuario NO guardado'+err);
	 			ok='no';
				callback(err,ok);
	 		}
	 	});
	}
	//check
	exports.findAllU= function ( callback ) {
		userModel.find(function (err,us) {
			if (!err){
				console.log('Users'+us);
				callback (null,us);
			}else {
				console.log('Error findall '+err);
				callback(err,us);
			}

		});
	}

	//TO-DO
	exports.removeUser = function (id, callback) {
		console.log(id)
		userModel.findByIdAndRemove({_id: id}, function (err,user) {
			console.log("paso "+ user);
			if (err) console.log("No se pudo eliminar"+err);
			else callback(err,user);
		});
	}

	//TO-DO
	exports.findByIDU= function(id, callback){
		userModel.findById(id,function (err,us) {
			if (!err){
				console.log(us);
				callback(err,us);

			}
			else{
				console.log ('ERROR findByID '+err);
				callback(err,us);
			}
		});
	}

	//PUT UPDATE
	exports.updateU= function (id,name,email,pass, callback) {

		userModel.findById({_id: id}, function (err,user) {
			if (err){
				console.log("no se pudo actualizar"+err);
				ok="no";
				callback(err,ok)
			}else{
					if(user){
						if(name) user.name=name;
						if (email) user.email=email;
						if (pass) user.pass=pass;
						user.save(function (err) {
							if (err){
								console.log('No se pudo guardar el usuario actualizado'+err)
								ok="nosave"
								callback(err,ok);
							}
							else{
								console.log("OK")
								ok="ok"
								callback(err,ok);
							}
						})
					}else{
						console.log("nofound");
						ok="nofound"
						callback(err,ok)
					}

			}
		});
	}
	//DELETE
