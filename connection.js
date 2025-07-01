const mongoose = require('mongoose');

async function connectToDatabase(url) {
    let connection = mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
    return connection;
}

module.exports = {connectToDatabase};