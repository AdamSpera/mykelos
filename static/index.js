var user = document.getElementById('user');
var hostField = document.getElementById('hostField');
var username = document.getElementById('username');
var generalPassword = document.getElementById('generalPassword');
var secretPassword = document.getElementById('secretPassword');
var authenticate = document.getElementById('authenticate');
var connectionText = document.getElementById('connectionText');
var loadingAnimation = document.getElementById('loadingAnimation');

var hostname = document.getElementById('hostname');
var interfaces = {
  'port1': document.getElementById('port1'),
  'port2': document.getElementById('port2'),
  'port3': document.getElementById('port3'),
  'port4': document.getElementById('port4'),
  'port5': document.getElementById('port5'),
  'port6': document.getElementById('port6'),
  'port7': document.getElementById('port7'),
  'port8': document.getElementById('port8'),
  'port9': document.getElementById('port9'),
  'port10': document.getElementById('port10'),
};

function getHostname() {
  fetch('/getHostname', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
    .then(response => response.text())
    .then(text => {
      hostname.innerText = text;
    })
}

authenticate.addEventListener('click', function () {
  loadingAnimation.style.display = 'block';

  fetch('/initConnection', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
    .then(response => response.text())
    .then(text => {
      console.log(text)
      if (text === 'success') {
        connectionText.innerText = 'Connection Active';
        connectionText.style.color = '#20ab4e';
        loadingAnimation.style.display = 'none';
        user.innerText = username.value;
        getHostname();
      } else {
        connectionText.innerText = 'Connection Failed';
        connectionText.style.color = 'rgb(184, 0, 0)';
        loadingAnimation.style.display = 'none';
      }

    })

});
