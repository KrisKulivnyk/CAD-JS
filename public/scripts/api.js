
function signIn(username, password, cb) {

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/auth', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify({
    username: username,
    password: password
  }));

  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState != 4) return;
    cb(xhr);
  }
}
