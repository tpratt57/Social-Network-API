const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost27017/social-network",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// logs mongo queries being executed
mongoose.set("debug", true);

module.exports =  mongoose.connection;