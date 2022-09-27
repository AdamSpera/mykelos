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
  'port0': document.getElementById('port0'),
  'port1': document.getElementById('port1'),
  'port2': document.getElementById('port2'),
  'port3': document.getElementById('port3'),
  'port4': document.getElementById('port4'),
  'port5': document.getElementById('port5'),
  'port6': document.getElementById('port6'),
  'port7': document.getElementById('port7'),
  'port8': document.getElementById('port8'),
  'port9': document.getElementById('port9')
};

var deviceInfo = {
  'ipAddress': document.getElementById('ipAddress'),
  'vlan': document.getElementById('vlan'),
  'gateway': document.getElementById('gateway'),
  'dns': document.getElementById('dns'),
  'firmware': document.getElementById('firmware')
}

function getHostname() {
  fetch('/getHostname', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
    .then(response => response.text())
    .then(text => {
      hostname.innerText = text;
    })
}

function getDeviceInfo() {

  fetch('/getDeviceInfo', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
    .then(response => response.text())
    .then(text => {
      // Gateway, VLAN, DNS, Firmware, IntSummary, NumOfGig
      text = text.split('*');
      deviceInfo.ipAddress.innerHTML = `<b>IP ADDRESS</b><br>${hostField.value}`
      deviceInfo.gateway.innerHTML = `<b>GATEWAY</b><br>${text[0].slice(0, -2)}`
      deviceInfo.vlan.innerHTML = `<b>VLAN</b><br>${text[1]}`
      deviceInfo.dns.innerHTML = `<b>DNS</b><br>${text[2]}`
      deviceInfo.firmware.innerHTML = `<b>FIRMWARE</b><br>Version ${text[3]}`
      loadingAnimation.style.display = 'none';

      interfaceStatus = [];
      for (var i = 0; i < text[4].length; i++) {
        interfaceStatus.push(text[4].charAt(i));
      }

      interfaces.port0.src = (interfaceStatus[0] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port1.src = (interfaceStatus[1] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port2.src = (interfaceStatus[2] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port3.src = (interfaceStatus[3] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port4.src = (interfaceStatus[4] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port5.src = (interfaceStatus[5] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port6.src = (interfaceStatus[6] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port7.src = (interfaceStatus[7] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port8.src = (interfaceStatus[8] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';
      interfaces.port9.src = (interfaceStatus[9] == '1') ? '/static/assets/active-port.png' : '/static/assets/off-port.png';

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
        user.innerText = username.value;
        getHostname();
        getDeviceInfo();
      } else {
        connectionText.innerText = 'Connection Failed';
        connectionText.style.color = 'rgb(184, 0, 0)';
        loadingAnimation.style.display = 'none';
      }

    })

});
