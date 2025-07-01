const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    const allDbUsers = await User.find();
    //Custom header should start with 'X-'
    res.setHeader('X-Custom-Header', 'MyCustomHeaderValue');
    return res.json(allDbUsers);
});

// router.get('/', async (req, res) => {
//     const allDbUsers = await User.find();
//     console.log("All Users from DB:", allDbUsers);
//     const html = `
//         <html>
//             <head>
//                 <title>Users</title>
//             </head>
//             <body>
//                 <h1>Users List</h1>
//                 <ul>
//                     ${allDbUsers.map(user => `<li>${user.firstName} ${user.lastName} ${user.email}</li>`).join('')}
//                 </ul>
//             </body>
//         </html>`;
//     return res.send(html);
// });

router.route('/:id')
.get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).send('User not found');
    }
})
.patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {firstName: req.body.first_name});
    return res.json({status: 201, message: 'User updated successfully'});
})
.delete(async (req, res) => {
    let result = await User.findByIdAndDelete(req.params.id);
    console.log("User deleted successfully " + result);
    res.json({status: 204, message: 'User deleted successfully'});
});


router.post('/', async (req, res) => {
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
});

// router.get('/', (req, res) => {
//     return res.send("Hello from Home Page");
// });

// router.get('/about', (req, res) => {
//     return res.send("Hello from About Page");
// });

module.exports = router;