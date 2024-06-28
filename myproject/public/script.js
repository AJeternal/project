document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const postForm = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');
    const postTitle = document.getElementById('postTitle');
    const postContent = document.getElementById('postContent');
    const postAuthor = document.getElementById('postAuthor');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                sessionStorage.setItem('username', username);
                location.href = 'home.html';
            } else {
                alert('نام کاربری یا رمز عبور اشتباه است');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = registerForm.username.value;
            const password = registerForm.password.value;

            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                sessionStorage.setItem('username', username);
                location.href = 'home.html';
            } else {
                alert('این نام کاربری قبلا استفاده شده است');
            }
        });
    }

    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = postForm.title.value;
            const content = postForm.content.value;
            const username = sessionStorage.getItem('username');

            const res = await fetch('/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, username }),
            });

            if (res.ok) {
                location.href = 'home.html';
            } else {
                alert('مشکلی در ایجاد پست وجود دارد');
            }
        });
    }

    if (postsDiv) {
        const loadPosts = async () => {
            const res = await fetch('/posts');
            const posts = await res.json();

            posts.forEach(post => {
                const postLink = document.createElement('a');
                postLink.href = `viewPost.html?title=${encodeURIComponent(post.title)}`;
                postLink.textContent = post.title;
                postsDiv.appendChild(postLink);
            });
        };

        loadPosts();
    }

    if (postTitle && postContent && postAuthor) {
        const params = new URLSearchParams(window.location.search);
        const title = params.get('title');

        const loadPost = async () => {
            const res = await fetch(`/post/${title}`);
            const post = await res.json();

            postTitle.textContent = post.title;
            postContent.textContent = post.content;
            postAuthor.textContent = post.username;
        };

        loadPost();
    }
});
