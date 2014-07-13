var createXhr = function(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.onerror = function() {
    document.getElementById('output').innerHTML = 'ERROR';
  };
  xhr.open(method, url, true);
  return xhr;
};

var getBlogPosts = function() {
  var xhr = createXhr('GET', 'http://127.0.0.1:9999/api/posts');
  xhr.setRequestHeader('Timezone-Offset',
                       new Date().getTimezoneOffset());
  xhr.setRequestHeader('Sample-Source',
                       'CORS in Action');
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    var elem = document.getElementById('output');

    var xPoweredBy = xhr.getResponseHeader('X-Powered-By');
    if (xPoweredBy) {
      var xpbDiv = document.createElement('div');
      xpbDiv.className = 'post';
      xpbDiv.innerHTML = 'X-Powered-By: ' + xPoweredBy;
      elem.appendChild(xpbDiv);
    }

    for (var postId in data) {
      var postText = data[postId]['post'];
      var div = document.createElement('div');
      div.className = 'post';
      div.id = 'postId' + postId;
      div.appendChild(document.createTextNode(postText));

      var a = document.createElement('a');
      a.innerHTML = 'Delete post #' + postId;
      a.href = '#';
      a.onclick = function(postId) {
        return function() {
          deletePost(postId);
        };
      }(postId);
      div.appendChild(document.createTextNode(" "));
      div.appendChild(a);

      elem.appendChild(div);
    }
  };
  xhr.send();
};

var deletePost = function(postId) {
  var url = 'http://127.0.0.1:9999/api/posts/' + postId;
  var xhr = createXhr('DELETE', url);
  xhr.withCredentials = true;
  xhr.onload = function() {
    if (xhr.status == 204) {
      var element = document.getElementById('postId' + postId);
      element.parentNode.removeChild(element);
    }
  };
  xhr.send();
};
