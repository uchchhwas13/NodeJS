const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();

//Middleware - plugin
app.use(express.urlencoded({extended: false}));


app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const html = `
        <html>
            <head>
                <title>Users</title>
            </head>
            <body>
                <h1>Users List</h1>
                <ul>
                    ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
                </ul>
            </body>
        </html>`;
    return res.send(html);
});

app.route('/api/users/:id')
.get( (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
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


app.post('/api/users', (req, res) => {
    const body = req.body;
    console.log("Body", body);
    users.push({
        id: users.length + 1,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('File written successfully');
    });
    return res.json({status: 'success', id:users.length});
});

app.get('/', (req, res) => {
    return res.send("Hello from Home Page");
});

app.get('/about', (req, res) => {
    return res.send("Hello from About Page");
});

app.listen(3000, () => console.log("Server is running on port 3000"));