const baseUrl = 'https://project-50n3.onrender.com'; 

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'User logged in successfully') {
            window.location.href = 'home.html';
        } else {
            alert('نام کاربری یا رمز عبور نادرست است');
        }
    });
});

document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'User registered successfully') {
            window.location.href = 'home.html';
        } else {
            alert('خطا در ثبت نام');
        }
    });
});

document.getElementById('createPostForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const author = localStorage.getItem('username');

    fetch(`${baseUrl}/createPost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, author })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Post created successfully') {
            window.location.href = 'home.html';
        } else {
            alert('خطا در ایجاد پست');
        }
    });
});

if (window.location.pathname === '/viewPosts.html') {
    fetch(`${baseUrl}/posts`)
    .then(response => response.json())
    .then(posts => {
        const postsContainer = document.getElementById('posts');
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.author}</p>`;
            postElement.addEventListener('click', () => {
                localStorage.setItem('postTitle', post.title);
                localStorage.setItem('postContent', post.content);
                localStorage.setItem('postAuthor', post.author);
                window.location.href = 'viewPost.html';
            });
            postsContainer.appendChild(postElement);
        });
    });
}

if (window.location.pathname === '/viewPost.html') {
    document.getElementById('postTitle').innerText = localStorage.getItem('postTitle');
    document.getElementById('postContent').innerText = localStorage.getItem('postContent');
    document.getElementById('postAuthor').innerText = localStorage.getItem('postAuthor');
}

function updateDateTime() {
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    const now = new Date();

    const date = now.toLocaleDateString('fa-IR');
    const time = now.toLocaleTimeString('fa-IR');

    if (dateElement) dateElement.textContent = `تاریخ: ${date}`;
    if (timeElement) timeElement.textContent = `ساعت: ${time}`;
}

setInterval(updateDateTime, 1000);

updateDateTime();
