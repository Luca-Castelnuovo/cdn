function materialize_init() {
    // Enable SideBar
    var sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {
        edge: 'right',
        draggable: 1
    });

    // Add character counter to inputs
    M.CharacterCounter.init(document.querySelectorAll('.counter'));

    // Enable MaterialBox
    var materialbox = M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});
}

if (typeof auto_init !== 'undefined' && auto_init) {
    document.addEventListener('DOMContentLoaded', function() {
        materialize_init();
    });
}


function request(method, url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        callback(JSON.parse(xhr.responseText));
    };

    xhr.open(method, url);
    xhr.send();
}


function feed_render_posts(data) {
    setInterval(feed_check_posts, 30000);

    if (!data.success) {
        return false;
    }

    localStorage.setItem('posts', JSON.stringify(data));

    var posts_array = [];

    for (post of data.posts) {
        posts_array.push(feed_render_post(post));
    }

    return posts_array.join('');
}

function feed_check_posts() {
    request('GET', `https://instakilo.lucacastelnuovo.nl/posts/actions/${CSRFtoken}/feed`, function(response) {
        if (JSON.stringify(response) !== localStorage.getItem('posts')) {
            M.Toast.dismissAll();
            M.toast({
                html: '<span>You have new posts!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load Posts</button>',
                displayLength: 86400000
            });
        }
    });
}

function feed_render_post(post) {
    var comments;
    var comments_form;

    if (post.comments !== null && post.comments_allowed) {
        comments = feed_render_comments(post.comments);
        comments_form = `
            <form action="/posts/actions" method="POST">
                <div class="row mb-0">
                    <div class="col s12 m9">
                        <div class="input-field col s12 mb-0">
                            <label for="form_comment">Comment</label>
                            <textarea id="form_comment" class="materialize-textarea counter" name="comment" data-length="200"></textarea>
                        </div>
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="hidden" name="CSRFtoken" value="${CSRFtoken}">
                        <input type="hidden" name="post_id" value="${post.id}">

                        <button class="btn waves-effect waves-light col s12 blue accent-4" name="action" type="submit">
                            Send <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        `;
    } else {
        comments = '<li class="collection-item">Comments are disabled</li>';
        comments_form = '';
    }

    var like_icon = post.liked ? 'favorite' : 'favorite_border';
    var like_action = post.liked ? 'undo_like' : 'like';

    return `
        <div class="col s12">
            <div class="card">
                <div class="card-image"><img id="post_image" class="materialboxed" data-caption="${post.caption}" src="${post.img_url}"></div>
                <div class="card-content">
                    <p>
                        <span id="post_owner"><a href="/u/${post.username}">${post.username}</a></span> ${post.caption}
                    </p>
                </div>
                <div class="card-action">
                    <div class="row likes">
                        <a href="/posts/actions/${CSRFtoken}/${like_action}/${post.id}" class="mr-6"><i class="material-icons blue-icon">${like_icon}</i></a> ${post.likes} likes
                    </div>
                    <div class="row mb-0">
                        <h6>Comments:</h6>
                        <ul class="collection">
                            ${comments}
                        </ul>
                            ${comments_form}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function feed_render_comments(comments) {
    var comments_array = [];

    for (comment of comments) {
        comments_array.push(feed_render_comment(comment));
    }

    return comments_array.join('');
}

function feed_render_comment(comment) {
    return `
        <li class="collection-item avatar">
            <img src="${comment.profile_picture}" onerror="this.src='https://github.com/identicons/${comment.username}.png'" class="circle" />
            <span class="title"><a href="/u/${comment.username}" class="blue-text">${comment.username}</a></span>
            <p class="truncate">${comment.body}</p>
        </li>
    `;
}


function feed_render_messages(data) {
    setInterval(feed_check_messages, 30000);

    if (!data.success) {
        return `
            <li class="collection-item avatar">
                <i class="material-icons circle">account_circle</i> <span class="title">FirstName Last Name</span>
                <p class="truncate">Layers, background, shot, concept – good!</p><a class="secondary-content" href="#!"><i class="material-icons blue-icon">message</i></a>
            </li>
        `;
    }

    localStorage.setItem('messages', JSON.stringify(data));

    var messages_array = [];

    for (message of data.messages) {
        messages_array.push(feed_render_message(message));
    }

    return messages_array.join('');
}

function feed_check_messages() {
    request('GET', `https://instakilo.lucacastelnuovo.nl/messages/actions/${CSRFtoken}`, function(response) {
        if (JSON.stringify(response) !== localStorage.getItem('messages')) {
            M.Toast.dismissAll();
            M.toast({
                html: '<span>You have new messages!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load messages</button>',
                displayLength: 86400000
            });
        }
    });
}

function feed_render_message(message) {
    return `
        <li class="collection-item avatar">
            <i class="material-icons circle">account_circle</i> <span class="title">FirstName Last Name</span>
            <p class="truncate">Layers, background, shot, concept – good!</p><a class="secondary-content" href="#!"><i class="material-icons blue-icon">message</i></a>
        </li>
    `;
}


// @codekit-prepend "init.js";
// @codekit-prepend "request.js";
// @codekit-prepend "feed_posts.js";
// @codekit-prepend "feed_messages.js";
