const { connect, connection } = require('mongose');

connect('mongodbd://localhost/videosAndResponses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;