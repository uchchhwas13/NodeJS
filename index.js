const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();

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

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).send('User not found');
    }
});

app.get('/', (req, res) => {
    return res.send("Hello from Home Page");
});

app.get('/about', (req, res) => {
    return res.send("Hello from About Page");
});

app.listen(3000, () => console.log("Server is running on port 3000"));