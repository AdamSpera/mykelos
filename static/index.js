var user = document.getElementById('user');
var hostField = document.getElementById('hostField');
var username = document.getElementById('username');
var generalPassword = document.getElementById('generalPassword');
var secretPassword = document.getElementById('secretPassword');
var authenticate = document.getElementById('authenticate');
var connectionText = document.getElementById('connectionText');
var loadingAnimation = document.getElementById('loadingAnimation');

var hostname = document.getElementById('hostname');

var deviceInfo = {
  'ipAddress': document.getElementById('ipAddress'),
  'vlan': document.getElementById('vlan'),
  'gateway': document.getElementById('gateway'),
  'dns': document.getElementById('dns'),
  'firmware': document.getElementById('firmware')
}

var numberRow = document.getElementById('numberRow');
var portRow = document.getElementById('portRow');

function getClients() {
  fetch('/getClients', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
    .then(response => response.text())
    .then(text => {
      console.log(text);
    })
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
      
      fastEthernetPorts = [];
      for (var i = 0; i < text[4].length; i++) {
        fastEthernetPorts.push(text[4].charAt(i));
      }

      for (var i = 0; i < fastEthernetPorts.length; i++) {
        var tableHeader = document.createElement("th");
        tableHeader.innerHTML = `<span>${(i + 1)}</span>`;
        numberRow.appendChild(tableHeader);
        var tableData = document.createElement("td");
        tableData.innerHTML = `<img id="port${i}" src="/static/assets/${(fastEthernetPorts[i] == '1') ? 'active' : 'off'}-port.png" alt="port">`;
        portRow.appendChild(tableData);
      }

      var tableHeader = document.createElement("th");
      tableHeader.innerHTML = `<span>&nbsp;</span>`;
      numberRow.appendChild(tableHeader);
      var tableData = document.createElement("td");
      tableData.innerHTML = `<img src="" alt="">`;
      tableData.style.cssText = 'border: none !important; cursor: default;'
      portRow.appendChild(tableData);

      console.log(text[5]);

      gigabitEthernetPorts = [];
      for (var i = 0; i < text[5].length; i++) {
        gigabitEthernetPorts.push(text[5].charAt(i));
      }

      for (var i = 0; i < gigabitEthernetPorts.length; i++) {
        var tableHeader = document.createElement("th");
        tableHeader.innerHTML = `<span>${(fastEthernetPorts.length + (i + 1))}</span>`;
        numberRow.appendChild(tableHeader);
        var tableData = document.createElement("td");
        tableData.innerHTML = `<img id="port${(fastEthernetPorts.length + (i + 1))}" src="/static/assets/${(gigabitEthernetPorts[i] == '1') ? 'active' : 'off'}-sfp.png" alt="port">`;
        portRow.appendChild(tableData);
      }

    })
}

authenticate.addEventListener('click', function () {
  loadingAnimation.style.display = 'block';

  if (username.value == '' || generalPassword.value == '' || secretPassword.value == '') {
    hostField.value = '192.168.0.1';
    username.value = 'cisco';
    generalPassword.value = 'password';
    secretPassword.value = 'password';
  }

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
        getClients();
      } else {
        connectionText.innerText = 'Connection Failed';
        connectionText.style.color = 'rgb(184, 0, 0)';
        loadingAnimation.style.display = 'none';
      }

    })

});
