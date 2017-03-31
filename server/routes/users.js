var userdao = require('../connectionDB/userconnection');
var usercontroller = {};

usercontroller.register = function(req,res){
  var name = req.body.name;
  var email= req.body.email;
  var pass= req.body.password;
  req.checkBody('name','Debe ingresar un nombre').notEmpty();
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
};

module.exports= usercontroller;
