const router = require('express').Router();
const moment = require('moment');
let User = require('../models/user.model');

// Get Users
router.route('/').get((req, res) => {
    User.find()
        .then(Users => res.json(Users))
        .catch(err => res.status(400).json('Error ' + err));
})

// Add User
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const createdAt = moment().toDate();

    const newUser = new User({ name, age, createdAt });
    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error ' + err))
})

// Update User
router.route('/update/:id').post((req, res) => {
    const updatedAt = moment().toDate();

    User.findById(req.params.id)
        .then(User => {
            User.name = req.body.name;
            User.age = req.body.age;
            User.updatedAt = updatedAt;

            User.save()
                .then(() => res.json('User Updated'))
                .catch(err => res.status(400).json('Error ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err))
})

// Delete User
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Deleted'))
        .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router;