const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const postsFilePath = path.join(__dirname, 'data', 'posts.json');

// Helper functions to read and write data
const readData = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath));
};

const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = readData(usersFilePath);

    if (users.find(user => user.username === username)) {
        return res.status(400).send('Username already exists');
    }

    users.push({ username, password });
    writeData(usersFilePath, users);

    res.send('User registered successfully');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readData(usersFilePath);

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(400).send('Invalid username or password');
    }

    res.send('Login successful');
});

app.post('/createPost', (req, res) => {
    const { title, content, username } = req.body;
    const posts = readData(postsFilePath);

    posts.push({ title, content, username });
    writeData(postsFilePath, posts);

    res.send('Post created successfully');
});

app.get('/posts', (req, res) => {
    const posts = readData(postsFilePath);
    res.json(posts);
});

app.get('/post/:title', (req, res) => {
    const posts = readData(postsFilePath);
    const post = posts.find(p => p.title === req.params.title);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    res.json(post);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
