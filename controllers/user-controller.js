const { User, Thought } = require('../models');
const { db } = require('../models/User');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__V',
            })
            .select('-__V')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__V'
            })
            .populate({
                path: 'friends',
                select: '-__V'
            })
            .select('-__V')
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res
                        .status(404)
                        .json({ message: 'no user associated with this id!' })
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create user
    createUser({ params, body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    },

    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'no user associated with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user associated with this id!' })
                }
            })
            .then(() => {
                res.json({ message: 'User and assoiciated thoughts deleted!' });
            })
            .catch((err) => res.json(err));
    },

    //add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true },
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user associated with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err))
    },

    //delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user associated with this id!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = userController;