const express = require('express');

const {handleGetAllUsers,
       handleGetUserById, 
       handleUpdateUserById, 
       handleDeleteUserById,
       handleCreateNewUser
    } = require('../controllers/user');

const User = require('../models/user');
const router = express.Router();

router.get('/', handleGetAllUsers);

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

router
.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);


router.post('/',handleCreateNewUser);

// router.get('/', (req, res) => {
//     return res.send("Hello from Home Page");
// });

// router.get('/about', (req, res) => {
//     return res.send("Hello from About Page");
// });

module.exports = router;