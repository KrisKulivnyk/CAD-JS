
var $form = document.getElementById('signInForm');
var $formError = $form.querySelector('[data-form-error]');
var $usernameError = $form.querySelector('[data-form-input-error="username"]');
var $passwordError = $form.querySelector('[data-form-input-error="password"]');

$form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  var username = data.get('username');
  var password = data.get('password');

  $formError.innerHTML = '';
  $usernameError.innerHTML = '';
  $passwordError.innerHTML = '';

  signIn(username, password, function (xhr) {
    if (xhr.status == 200) {
      alert('Hello, ' + username);
    } else {
      var response = JSON.parse(xhr.responseText);
      if (response.code == 401) {
        $formError.innerHTML = 'User not found';
      } else if (response.code == 422) {
        if (response.type === 'missed_username') $usernameError.innerHTML = 'Required field';
        else if (response.type === 'missed_password') $passwordError.innerHTML = 'Required field';
      }
    }
  });
}
