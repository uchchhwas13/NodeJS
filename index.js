const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();

//Connection
mongoose.connect('mongodb://127.0.0.1:27017/userdb')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true  
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String
    },
    gender: {
        type: String
    },
}, {timestamps: true});

//Model
const User = mongoose.model('User', userSchema);

//Middleware - plugin
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile('log.txt', `${Date.now()} - ${req.method} - ${req.url}\n`, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
});

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find();
    //Custom header should start with 'X-'
    res.setHeader('X-Custom-Header', 'MyCustomHeaderValue');
    return res.json(allDbUsers);
});

app.get('/users', async (req, res) => {
    const allDbUsers = await User.find();
    console.log("All Users from DB:", allDbUsers);
    const html = `
        <html>
            <head>
                <title>Users</title>
            </head>
            <body>
                <h1>Users List</h1>
                <ul>
                    ${allDbUsers.map(user => `<li>${user.firstName} ${user.lastName} ${user.email}</li>`).join('')}
                </ul>
            </body>
        </html>`;
    return res.send(html);
});

app.route('/api/users/:id')
.get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).send('User not found');
    }
})
.patch((req, res) => {
    return res.json({status: 'Pending'});
})
.delete((req, res) => {
    res.json({status: 'Pending'});
});


app.post('/api/users', async (req, res) => {
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
    
    users.push({
        id: users.length + 1,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     if (err) {
    //         console.error('Error writing to file:', err);
    //         return res.status(500).send('Internal Server Error');
    //     }
    //     console.log('File written successfully');
    // });
    return res.status(201).json({status: 'success', id:result._id});
});

app.get('/', (req, res) => {
    return res.send("Hello from Home Page");
});

app.get('/about', (req, res) => {
    return res.send("Hello from About Page");
});

app.listen(3000, () => console.log("Server is running on port 3000"));