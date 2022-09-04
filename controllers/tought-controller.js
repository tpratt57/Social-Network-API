const { Thought, User } = require('../models');

const thoughtController = {
    //get all thots LUL
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__V'
            })
            .select('-__V')
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one thought by id

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__V'
            })
            .select('-__V')
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No though found with this id!' })
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create thought and push created thoughts _id to associated users thought array 
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res
                        .status(404)
                        .json({ message: 'Thought created, but no user associated with this id!' })
                }

                res.json({ message: 'Thought successfully created!' });
            })
            .catch((err) => res.json(err));
    },

    //update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },

    //delete thought
    deleteThought({params, body}, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) => {
                if(!dbThoughtData){
                    return res.status(404).json({message: 'No thought with this id!'})
                }

                //remove thought id from users 'thought' field
                return User.findOneAndUpdate(
                    {thoughts: params.id},
                    { $pull: { thoughts: params.id }},
                    {new: true}
                );
            })
            .then((dbUserData) => {
                if(!dbUserData){
                    return res 
                    .status(404)
                    .json({message: 'Thought created, but no user associated with this id!'})
                }
                res.json({message: 'Thought successfully deleted!'});
            })
            .catch((err) => res.json(err));
    },

    //add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id},
            { $addToSet: { reactions: body}},
            { new: true, runValidators: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought associated with this id!'})
                return
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err))
    },

    // delete reaction
    deleteReaction({params}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: {reactions: { reactionId: params.reactionId }}},
            { new: true}
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;