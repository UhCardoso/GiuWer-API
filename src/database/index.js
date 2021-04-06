const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<user>:<password>@cluster0.umpgp.mongodb.net/<db_name>?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

module.exports = mongoose;