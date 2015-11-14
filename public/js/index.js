$(document).ready(function() {
  $('.new').keypress(function(e) {
    if(e.which == 13) {
      createPost($('.writesomething').val());
    }
  });

  loadPosts();

});

function createPost(text) {
  $.post('/posts', { content: text }, function(results) {
    if(results.success) {

    } else {

    }
  });
};

function renderPost(post) {
  console.log(post);
  var dateDiff = new Date().getHours() - new Date(post.created).getHours();

  var post = '<div class="post real-post" data-id=""> \
      <div class="content"> \
          <p class="text">' + post.content + '</p> \
          <p class="info">' + dateDiff + ' hours ago</p> \
      </div> \
      <div class="votes"> \
          <div class="count">' + post.votes + '</div> \
          <div class="actions"> \
              <button class="upvote"> \
                  <img src="img/chevron-up.svg" alt="upvote" class="chevron"> \
              </button> \
              <button class="downvote"> \
                  <img src="img/chevron-down.svg" alt="downvote" class="chevron"> \
              </button> \
          </div> \
      </div> \
  </div>';

  $('#post-container').append(post);
};

function loadPosts() {
  $.get('/posts', function(results) {
    if(!results.success) {

    } else {
      console.log(results.posts);
      for(var i in results.posts) {

        renderPost(results.posts[i]);
      }
    }
  });
}

function removeAll() {
  $('.real-post').remove();
};

function vote(id, type) {
  $.ajax({
    method: 'PUT',
    url: '/posts/' + id + '/vote/' + type,
    success: function(results) {
      if(results.success) {

      } else {

      }
    }
  })
};
