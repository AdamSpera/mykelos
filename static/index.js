var user = document.getElementById('user');
var hostField = document.getElementById('hostField');
var username = document.getElementById('username');
var generalPassword = document.getElementById('generalPassword');
var secretPassword = document.getElementById('secretPassword');
var authenticate = document.getElementById('authenticate');
var connectionText = document.getElementById('connectionText');
var loadingAnimation = document.getElementById('loadingAnimation');

var hostname = document.getElementById('hostname');
var mainView = document.getElementById('mainView');
var focusView = document.getElementById('focusView');
var returnLink = document.getElementById('returnLink');

var deviceInfo = {
  'ipAddress': document.getElementById('ipAddress'),
  'vlan': document.getElementById('vlan'),
  'gateway': document.getElementById('gateway'),
  'dns': document.getElementById('dns'),
  'firmware': document.getElementById('firmware')
}

var numberRow = document.getElementById('numberRow');
var portRow = document.getElementById('portRow');
var clientTable = document.getElementById('clientTable');

// Port Settings Fields
var switchPortDisplay = document.getElementById('switchPortDisplay'); //Boyer-214-Podium / 1
var portNameInput = document.getElementById('portNameInput'); // Device Name / Port#

var enablePortButton = document.getElementById('enablePortButton'); //enable port status
var disablePortButton = document.getElementById('disablePortButton'); //enable port status

var portAccessButton = document.getElementById('portAccessButton'); // access
var portTrunkButton = document.getElementById('portTrunkButton'); // trunk

var portVLAN1Display = document.getElementById('portVLAN1display'); //[access: VLAN, trunk: Native VLAN]
var portVLAN1Input = document.getElementById('portVLAN1Input'); //input text
var portVLAN2Display = document.getElementById('portVLAN2Display'); //[access: Voice VLAN, trunk: Allowed VLANs]
var portVLAN2Input = document.getElementById('portVLAN2Input'); //input text

var portRSTPEnableButton = document.getElementById('portRSTPEnableButton'); //enable button
var portRSTPDisableButton = document.getElementById('portRSTPDisableButton'); //disable button

var portSTPGuardSelect = document.getElementById('portSTPGuardSelect'); // BPDU Guard | Root Guard | Loop Guard | Disabled

var portSettingsUpdateButton = document.getElementById('portSettingsUpdateButton'); //update button
// End Settings Fields

function toggleButtonStyles(clickedButton, otherButton) {
  clickedButton.classList.remove('portSettingsButtonInactive');
  clickedButton.classList.add('portSettingsButtonActive');
  otherButton.classList.remove('portSettingsButtonActive');
  otherButton.classList.add('portSettingsButtonInactive');
}

enablePortButton.addEventListener('click', function () { toggleButtonStyles(enablePortButton, disablePortButton); });
disablePortButton.addEventListener('click', function () { toggleButtonStyles(disablePortButton, enablePortButton); });
portRSTPEnableButton.addEventListener('click', function () { toggleButtonStyles(portRSTPEnableButton, portRSTPDisableButton); });
portRSTPDisableButton.addEventListener('click', function () { toggleButtonStyles(portRSTPDisableButton, portRSTPEnableButton); });

portAccessButton.addEventListener('click', function () {
  toggleButtonStyles(portAccessButton, portTrunkButton);
  portVLAN1Display.innerText = 'VLAN';
  portVLAN2Display.innerText = 'Voice VLAN';
});
portTrunkButton.addEventListener('click', function () {
  toggleButtonStyles(portTrunkButton, portAccessButton);
  portVLAN1Display.innerText = 'Native VLAN';
  portVLAN2Display.innerText = 'Allowed VLANs';
});


function returnMainView() {
  mainView.style.display = 'block';
  focusView.style.display = 'none';
  returnLink.style.display = 'none';
}

function focusPort(port) {
  console.log(port)
  mainView.style.display = 'none';
  focusView.style.display = 'block';
  returnLink.style.display = 'block';

  // Get Port Settings
  fetch('/getPortSetting', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
  .then(response => response.text())
  .then(text => {
    // convert response to an array of json objects
    var interfacesSettings = JSON.parse(text);
    console.log(interfacesSettings);

    // set switchPortDisplay to passed data
    switchPortDisplay.innerText = `${hostname.innerText} / ${port}`;
    // set portNameInput to passed data
    portNameInput.value = interfacesSettings[(port - 1)].description;

    // toggle enablePortButton and disablePortButton by the passed data
    toggleButtonStyles(((interfacesSettings[(port - 1)].link_status == 'up') ? enablePortButton : disablePortButton), ((interfacesSettings[(port - 1)].link_status == 'up') ? disablePortButton : enablePortButton))



  })

}

function getClients() {
  fetch('/getClients', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
    .then(response => response.text())
    .then(text => {
      var clients = text.split('*BR*');
      for (let i = 0; i < clients.length; i++) {
        var client = clients[i].split('*AS*');
        var tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td><span>${(i + 1)}</span></td><td>${client[0]}</span></td><td><span>${client[2]}</span></td><td><span>${client[1]}</span></td><td><span>${client[4]}</span></td><td><span>${client[3]}</span></td>`;
        clientTable.appendChild(tableRow);
      }
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
        tableData.innerHTML = `<img id="port${i}" src="/static/assets/${(fastEthernetPorts[i] == '1') ? 'active' : 'off'}-port.png" alt="port" onclick="focusPort(${(i + 1)})">`;
        portRow.appendChild(tableData);
      }

      var tableHeader = document.createElement("th");
      tableHeader.innerHTML = `<span>&nbsp;</span>`;
      numberRow.appendChild(tableHeader);
      var tableData = document.createElement("td");
      tableData.innerHTML = `<img src="" alt="">`;
      tableData.style.cssText = 'border: none !important; cursor: default;'
      portRow.appendChild(tableData);

      gigabitEthernetPorts = [];
      for (var i = 0; i < text[5].length; i++) {
        gigabitEthernetPorts.push(text[5].charAt(i));
      }

      for (var i = 0; i < gigabitEthernetPorts.length; i++) {
        var tableHeader = document.createElement("th");
        tableHeader.innerHTML = `<span>${(fastEthernetPorts.length + (i + 1))}</span>`;
        numberRow.appendChild(tableHeader);
        var tableData = document.createElement("td");
        tableData.innerHTML = `<img id="port${(fastEthernetPorts.length + (i + 1))}" src="/static/assets/${(gigabitEthernetPorts[i] == '1') ? 'active' : 'off'}-sfp.png" alt="port" onclick="focusPort(${fastEthernetPorts.length + (i + 1)})">`;
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
