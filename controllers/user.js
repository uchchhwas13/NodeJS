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

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {firstName: req.body.first_name});
    return res.json({status: 201, message: 'User updated successfully'});
}

async function handleDeleteUserById(req, res) {
    let result = await User.findByIdAndDelete(req.params.id);
    console.log("User deleted successfully " + result);
    return res.json({status: 204, message: 'User deleted successfully'});
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    console.log("Body", body);
    if (!body.first_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).send('All fields are required');
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender});

    console.log("User created:", result); 
    
    // users.push({
    //     id: users.length + 1,
    //     first_name: body.first_name,
    //     last_name: body.last_name,
    //     email: body.email,
    //     gender: body.gender,
    //     job_title: body.job_title
    // });
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     if (err) {
    //         console.error('Error writing to file:', err);
    //         return res.status(500).send('Internal Server Error');
    //     }
    //     console.log('File written successfully');
    // });
    return res.status(201).json({status: 'success', id:result._id});
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
};
