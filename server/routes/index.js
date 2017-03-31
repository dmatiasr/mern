//instance to user.js
var userInstance = require('../models/user');
var usercontroller= require('./users');
var userdao = require('../connectionDB/userconnection');
var express = require('express');
var router= express.Router();
var passport=require('passport');


router.get('/',function (req,res) {
	userdao.findAllU(function(err,users){
		if (err){
			res.status(404).send();
		}
		else{
			res.json(users);
		}

	})
});

router.get('/findById/:id', function (req,res) {
	userdao.findByIDU(req.params.id, function (err,user) {
		if (err){
			res.status(404).send();
		}else{
			res.json(user);
		}
	})
});

router.post('/',function (req, res) {
	var name = req.body.name;
	var email= req.body.email;
	var username=req.body.username;
	var pass= req.body.password;

	req.checkBody('name','Debe ingresar un nombre').notEmpty();
	req.checkBody('username','Debe ingresar un nombre').notEmpty();
	req.checkBody('email','Debe ingresar un email').notEmpty();
	req.checkBody('email','Debe ser valido').isEmail();
	req.checkBody('password','Debe ingresar su contraseña').notEmpty();
	var error= req.validationErrors();

	if (error){
		console.log('Algo paso');
		res.status(409);
	}
	else{
 		userdao.addU(name, email,pass, function (e, data) {
 			if (e) console.log('error de creacion '+e);
 			if (data=='ok'){
				res.status(200).send();
				//res.redirect('/');
 			}
 			else {
				res.status(409).send();
		//		res.redirect('/');
 			}
 		});
	}
})
router.delete('/delete/:id', function(req, res){
	var id = req.params.id;
	userdao.removeUser(id, function (e,data) {
		if (e) {
			console.log('No se ha podido eliminar el usuario')
			res.status(500).send();
		}else{
			console.log('Eliminado');
			res.status(200).send();
		}

	})
})

router.put('/update/:id', function(req,res){
	var id = req.params.id;
	var name = req.body.name;
	var email= req.body.email;
	var passd=req.body.pass;

	console.log(id+name+email+passd)
	userdao.updateU(id,name,email,passd,function(e,data){
		if (e){
			console.log('Algo ocurrió en la actualizacion')
			res.status(409).send();
		}else{
			if (data=="ok"){
				console.log("actualizacion lograda")
				res.status(201).send();
			}
			if(data=="nosave"){
				console.log("no se pudo actualizar ni guardar en DB");
				res.status(500).send();
			}
		}
	})
})

router.get('/register',function (req,res) {
	res.status(200).send();
})

router.post('/register',function (req,res) {
	//usercontroller.register(req,res);
	console.log(req.body);

	var aux={
		username:req.body.username,
		name:req.body.name,
		email:req.body.email,
		password:req.body.password
	}
	console.log(aux);
	userInstance.register(new userInstance({
		username: req.body.username,
		name: req.body.name,
		email : req.body.email,
	}), req.body.password,function (error,user) {
		if (error){
			console.log('Error CONSOLE :'+error);
			res.status(401).send(); //Unaothorized
		}else{
			if (user){
				passport.authenticate('local')(req, res, function () {
					res.status(200).send();
				})
			}else{
				res.status(401).send();
			}

		}

	})
})

router.post('/login', passport.authenticate('local'), function(req, res) {
	console.log("SESION DE: "+req.session.passport.user);
	res.status(200).send();
})

router.get('/login', function (req,res) {
	console.log("Entre al GET LOGIN api");
	//	var uname=req.session.passport.user
	//console.log("GET LOGIN API USERNAME "+req.session.passport.user);
	userInstance.find({username : req.session.passport.user}, function(err,user){
		console.log("Entre");
		if (err){
			console.log("Error-login "+err);
			res.status(404).send();
		}else{
			console.log("user encontrado y logueado : "+user);
			res.json(user);
		}
	})

})

router.get('/logout',function (req,res) {
	req.logout();
	res.status(200).send();
});


module.exports=router;
