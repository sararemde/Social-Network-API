const User = require('../models/user');

module.exports = {
    getUsers(req, res) {
        User.find({})
        .then((courses) => res.json(courses))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId })
        .populate([
            { }
        ])
    .select('__v')
    .then((course) => 
        !course
            ? res.status(404).json({ message: 'No user with that ID'})
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },
}