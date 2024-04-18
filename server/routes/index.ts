

import express from 'express';
const router = express.Router();
import Contact from '../models/contact';
import {HttpError} from "http-errors";
import User from '../models/user';
import {AuthGuard,UserDisplayName} from "../utils/index";
import passport from "passport";

/**TOP-LEVEL ROUTES **/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page : "home", displayName : UserDisplayName });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page : "home", displayName : UserDisplayName });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page : "about", displayName : UserDisplayName });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page : "contact", displayName : UserDisplayName });
});

/** AUTHENTICATION ROUTES **/

router.get('/login', function(req, res, next) {
  if(!req.user){
  res.render('index',
      { title: 'Login', page : "login", messages: req.flash('loginMessage'), displayName : UserDisplayName });
  }
  return res.redirect('/contact-list');
});
router.post('/login',function(req,res,next){
  passport.authenticate('local'),function (err:Error, user: Express.User, info: string){

    if(err){
      console.error(err);
      res.end();
    }

    if(!user){
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login') // status 302
    }

    req.logIn(user, function(err){
      if(err){
        console.error(err);
        res.end();
      }
      res.redirect('.contact-list');
    });
  }
});


router.get('/register', function(req, res, next) {
  if(!req.user){
  res.render('index',
      { title: 'Register', page : "register", displayName : UserDisplayName });
  }
  return res.redirect('/contact-list');
});

router.post('/register', function(req,res,next){
  let newUser = new User(
      {
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + '' + req.body.lastName
      }
  );

  console.log("username:" + req.body.username);
  console.log("email:" + req.body.emailAddress);
  console.log("password:" + req.body.password);

  User.register(newUser, req.body.password, function(err){

    if(err){
      let errorMessage = "Server Error"
      if(err.name == "UserExistsError"){
        console.error("Error: User Already Exists");
        errorMessage = "Registration Error";

      }
      req.flash('registerMessage', errorMessage);
      res.redirect('/register');
    }

    return passport.authenticate('local')(req, res, function (){
      return res.redirect('/contact-list');
    });
  });
});


router.get('/logout', function (req, res, next){
  req.logout(function (err){
    if(err){
      console.error(err);
      res.end();
    }
    res.redirect('/login')
  });
});



/** CONTACT-LIST ROUTES **/
router.get('/contact-list', AuthGuard,function(req, res, next) {
  Contact.find().then(function(data : any){
    // console.log(contacts);
    res.render('index', { title: 'Contact List', page : "contact-list",
      contacts : data, displayName : '' });

  }).catch(function (err : HttpError){
    console.error("Error reading contacts from Database" + err);
    res.end();
  })

});

router.get('/edit/:id', AuthGuard,function(req, res, next) {
  let id = req.params.id
  Contact.findById(id).then(function(contactToEdit){
    res.render('index', { title: 'Edit Contact', page : "edit",
    contact: contactToEdit,  displayName : UserDisplayName });

  }).catch(function(err){
    console.error(err);
    res.end()
  });

});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page : "login", displayName : UserDisplayName });
});

router.get('/product', function(req, res, next) {
  res.render('index', { title: 'Our Products', page : "product", displayName : UserDisplayName });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page : "register", displayName : UserDisplayName });
});

router.get('/add', AuthGuard,function(req, res, next) {
  res.render('index', { title: 'Add Contact', page : "edit", displayName : UserDisplayName });
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Our Services', page : "services", displayName : UserDisplayName });
});
//http://localhost:3000/

router.get('/delete/:id', AuthGuard, function(req, res, next) {
  let id = req.params.id
  Contact.deleteOne({_id: id}).then(function(){
    res.redirect('/contact-list' +
        '');

  }).catch(function(err){
    console.error(err);
    res.end()
  });

});

/** Post **/
router.post('/edit/:id', AuthGuard,function(req, res, next){

  let id = req.params.id;

  let updateContact = new Contact(
      {
        "_id": id,
        "fullName": req.body.fullName,
        "ContactNumber": req.body.emailAddress,
        "EmailAddress": req.body.emailAddress
      }
  );
  Contact.updateOne({_id: id}, updateContact).then(function (){
    res.redirect('/contact-list');
  }).catch(function (err){
    console.error(err);
    res.end();
  });

});

router.post('/add', AuthGuard,function(req, res, next){

  let newContact = new Contact(

      {
        "fullName": req.body.fullName,
        "ContactNumber": req.body.emailAddress,
        "EmailAddress": req.body.emailAddress
      }
  );
  Contact.create(newContact).then(function (){
    res.redirect('/contact-list');
  }).catch(function (err){
    console.error(err);
    res.end();
  });

});
export default router;
