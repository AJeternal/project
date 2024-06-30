const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

app.post('/register', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send('User logged in successfully');
    });
});

app.post('/createPost', (req, res) => {
    const newPost = new Post(req.body);
    newPost.save((err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Post created successfully');
    });
});

app.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(posts);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
