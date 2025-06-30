const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/', (req, res) => {
    return res.send("Hello from Home Page");
});

app.get('/about', (req, res) => {
    return res.send("Hello from About Page");
});

app.listen(3000, () => console.log("Server is running on port 3000"));