const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find();
    //Custom header should start with 'X-'
    res.setHeader('X-Custom-Header', 'MyCustomHeaderValue');
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).send('User not found');
    }
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById
};
