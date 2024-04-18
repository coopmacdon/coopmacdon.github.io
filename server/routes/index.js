"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contact_1 = __importDefault(require("../models/contact"));
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: '' });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: "about", displayName: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: "contact", displayName: '' });
});
router.get('/contact-list', function (req, res, next) {
    contact_1.default.find().then(function (data) {
        res.render('index', { title: 'Contact List', page: "contact-list",
            contacts: data, displayName: '' });
    }).catch(function (err) {
        console.error("Error reading contacts from Database" + err);
        res.end();
    });
});
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id).then(function (contactToEdit) {
        res.render('index', { title: 'Edit Contact', page: "edit",
            contact: contactToEdit, displayName: '' });
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: "login", displayName: '' });
});
router.get('/product', function (req, res, next) {
    res.render('index', { title: 'Our Products', page: "product", displayName: '' });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: "register", displayName: '' });
});
router.get('/add', function (req, res, next) {
    res.render('index', { title: 'Add Contact', page: "edit", displayName: '' });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: "services", displayName: '' });
});
router.get('/delete/:id', function (req, res, next) {
    let id = req.params.id;
    contact_1.default.deleteOne({ _id: id }).then(function () {
        res.redirect('/contact-list' +
            '');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.post('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    let updateContact = new contact_1.default({
        "_id": id,
        "fullName": req.body.fullName,
        "ContactNumber": req.body.emailAddress,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.updateOne({ _id: id }, updateContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.post('/add', function (req, res, next) {
    let newContact = new contact_1.default({
        "fullName": req.body.fullName,
        "ContactNumber": req.body.emailAddress,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.create(newContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map