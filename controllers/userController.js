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
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(userData => 
                !userData
                    ? res.status(404).json({ message: 'No user found with this id'})
                    : User.updateMany(
                        { _id: { $in: userData.friends} },
                        { $pull: { friends: req.params.userId } }
                    )
                        .then(() => {
                            Thought.deleteMany({ username: userData.username })
                                .then(() => {
                                    res.json({ message: 'successfully deleted user' });
                                })
                                .catch(err => res.status(400).json(err));
                        })
                        .catch(err => res.status(400).json(err));
                    })
                    .catch(err => res.status(400).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $set: req.body },
            { runValidators: true, new: true } 
        )
            .then(userData => {
                !userData 
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

