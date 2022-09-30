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
var subClientTable = document.getElementById('subClientTable');

var focusContent = document.getElementById('focusContent');

var portTitle = document.getElementById('portTitle');

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

var loadingAnimation2 = document.getElementById('loadingAnimation2');

var portSettingsUpdateButton = document.getElementById('portSettingsUpdateButton'); //update button

// END DOCUMENT GET ELEMENT BY ID ---------------------------------------------------------------------------------------------


// defined in /getSwitchData from authenticate
var globalSwitchData = {};


// RETURN TO MAIN VIEW
function returnMainView() {
  mainView.style.display = 'block';
  focusView.style.display = 'none';
  returnLink.style.display = 'none';
  // deactivate bold effect on port number
  document.getElementsByName("portDisplayNumber").forEach(element => {
    element.style.fontWeight = '600';
  });
}


// DISPLAY DEVICE DEVICE INFO
function displayDeviceInfo() {

  // set display switch ip address
  deviceInfo.ipAddress.innerHTML = `<b>IP ADDRESS</b><br>${hostField.value}`

  // set display switch gateway
  var gatewayText = globalSwitchData.show_running_config.split('ip domain-name ')[1].split('!')[0]
  deviceInfo.gateway.innerHTML = `<b>GATEWAY</b><br>${gatewayText.slice(0, -2)}`

  // set display switch vlan
  deviceInfo.vlan.innerHTML = `<b>VLAN</b><br>No Default`
  globalSwitchData.show_vlan_brief.forEach(element => {
    if (element.name == 'default') {
      deviceInfo.vlan.innerHTML = `<b>VLAN</b><br>${element.vlan_id}`
    };
  });

  // set display switch dns
  var dnsText = globalSwitchData.show_running_config.split('ip domain-name ')[1].split('!')[0];
  deviceInfo.dns.innerHTML = `<b>DNS</b><br>${dnsText}`

  // set display switch firmware
  var firmwareText = globalSwitchData.show_running_config.split('version ')[1].split('no')[0];
  deviceInfo.firmware.innerHTML = `<b>FIRMWARE</b><br>Version ${firmwareText}`

};


// DISPLAY SWITCH GUI PORTS
function displaySwitchGUI() {
  var ethCounter = 0;

  // for every FAST interface
  globalSwitchData.show_ip_interface_brief.forEach(interface => {
    if (!(interface.intf).includes('lan') && !(interface.intf).includes('Gig')) {
      ethCounter++;
      var tableHeader = document.createElement("th");
      tableHeader.innerHTML = `<span name="portDisplayNumber">${(interface.intf).split('/')[1]}</span>`;
      numberRow.appendChild(tableHeader);
      var tableData = document.createElement("td");
      tableData.innerHTML = `<img id="port${(interface.intf).split('/')[1]}" src="/static/assets/${(interface.status == 'up') ? 'active' : 'off'}-port.png" alt="port" onclick="focusPort(${(interface.intf).split('/')[1]})">`;
      portRow.appendChild(tableData);
    }
  });

  // spacer between sfp and fast ports
  var tableHeader = document.createElement("th");
  tableHeader.innerHTML = `<span>&nbsp;</span>`;
  numberRow.appendChild(tableHeader);
  var tableData = document.createElement("td");
  tableData.innerHTML = `<img src="" alt="">`;
  tableData.style.cssText = 'border: none !important; cursor: default;'
  portRow.appendChild(tableData);

  // for every GIGABIT interface
  globalSwitchData.show_ip_interface_brief.forEach(interface => {
    if (!(interface.intf).includes('lan') && !(interface.intf).includes('Fas')) {
      ethCounter++;
      var tableHeader = document.createElement("th");
      tableHeader.innerHTML = `<span name="portDisplayNumber">${(ethCounter)}</span>`;
      numberRow.appendChild(tableHeader);
      var tableData = document.createElement("td");
      tableData.innerHTML = `<img id="port${ethCounter}" src="/static/assets/${(interface.status == 'up') ? 'active' : 'off'}-sfp.png" alt="port" onclick="focusPort(${ethCounter})">`;
      portRow.appendChild(tableData);
    }
  });

};


// DISPLAY TOTAL CLIENT LIST
function displayClientList() {
  var counter = 1;

  // for every client in the client list
  globalSwitchData.show_cdp_neighbors_detail.forEach(client => {
    var tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td><span>${counter}</span></td><td>${client.destination_host}</span></td><td><span>${client.management_ip}</span></td><td><span>${client.local_port}</span></td><td><span>${client.capabilities}</span></td><td><span>${client.platform}</span></td>`;
    clientTable.appendChild(tableRow);
    counter++;
  });

};


// ON AUTHENTICATION CLICK GET ALL DATA
authenticate.addEventListener('click', function () {
  loadingAnimation.style.display = 'block';

  // autofill for beta testing
  if (username.value == '' || generalPassword.value == '' || secretPassword.value == '') {
    hostField.value = '192.168.0.1';
    username.value = 'cisco';
    generalPassword.value = 'password';
    secretPassword.value = 'password';
  }

  // fetch /getSwitchData from Flask script
  fetch('/getSwitchData', { method: 'POST', body: JSON.stringify({ switchIP: hostField.value, switchUsername: username.value, switchGeneralPassword: generalPassword.value, switchSecretPassword: secretPassword.value }) })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      globalSwitchData = res;

      // hide loading animation after data received
      loadingAnimation.style.display = 'none';
      // update connection text
      connectionText.innerText = 'Connection Active';
      connectionText.style.color = '#20ab4e';

      // update hostname text
      hostname.innerText = res['show_running_config'].split('hostname ')[1].split('!')[0];

      // update user text
      user.innerText = username.value;

      displayDeviceInfo();
      displaySwitchGUI();
      displayClientList();

    })

});


// TOGGLE BUTTON STYLES
function toggleButtonStyles(clickedButton, otherButton) {
  clickedButton.classList.remove('portSettingsButtonInactive');
  clickedButton.classList.add('portSettingsButtonActive');
  otherButton.classList.remove('portSettingsButtonActive');
  otherButton.classList.add('portSettingsButtonInactive');
};
enablePortButton.addEventListener('click', function () { toggleButtonStyles(enablePortButton, disablePortButton); });
disablePortButton.addEventListener('click', function () { toggleButtonStyles(disablePortButton, enablePortButton); });


// TOGGLE VLAN TEXT DISPLAY
function changeVLANText(mode) {
  if (mode == 'access') {
    portVLAN1Display.innerText = 'VLAN';
    portVLAN2Display.innerText = 'Voice VLAN';
  } else if (mode == 'trunk') {
    portVLAN1Display.innerText = 'Native VLAN';
    portVLAN2Display.innerText = 'Allowed VLANs';
  }
}


// TOGGLE BUTTON FOR ACCESS VS TRUNK
portAccessButton.addEventListener('click', function () {
  toggleButtonStyles(portAccessButton, portTrunkButton);
  changeVLANText('access');
});
portTrunkButton.addEventListener('click', function () {
  toggleButtonStyles(portTrunkButton, portAccessButton);
  changeVLANText('trunk');
});


// DISPLAY PORT SETTINGS
function focusPort(port) {
  console.log(`Port Selected: ${port}`);

  mainView.style.display = 'none';
  focusView.style.display = 'block';
  returnLink.style.display = 'block';
  focusContent.style.display = 'block';

  // activate bold effect on port number
  document.getElementsByName("portDisplayNumber").forEach(element => {
    element.style.fontWeight = (element.innerText == port) ? '900' : '600';
  });

  // set switchPortDisplay to passed data
  switchPortDisplay.innerHTML = `${hostname.innerText} / ${port}`;

  // set portNameInput to passed data
  portNameInput.value = globalSwitchData.show_interfaces[port - 1].description

  // set enabled or disabled button style
  toggleButtonStyles((((globalSwitchData.show_interfaces[(port - 1)].protocol_status).includes('disa')) ? disablePortButton : enablePortButton), (((globalSwitchData.show_interfaces[(port - 1)].protocol_status).includes('disa')) ? enablePortButton : disablePortButton))

  // set access or trunk button style
  toggleButtonStyles((((globalSwitchData.show_interface_switchport[(port - 1)].admin_mode).includes('a')) ? portAccessButton : portTrunkButton), (((globalSwitchData.show_interface_switchport[(port - 1)].admin_mode).includes('a')) ? portTrunkButton : portAccessButton))

  // set portVLAN1Display and portVLAN2Display
  if ((globalSwitchData.show_interface_switchport[(port - 1)].admin_mode).includes('a')) {
    changeVLANText('access')
    portVLAN1Input.value = globalSwitchData.show_interface_switchport[(port - 1)].access_vlan;
    portVLAN2Input.value = globalSwitchData.show_interface_switchport[(port - 1)].voice_vlan;
  } else {
    changeVLANText('trunk')
    portVLAN1Input.value = globalSwitchData.show_interface_switchport[(port - 1)].native_vlan;
    var allowedVLANs = '';
    (globalSwitchData.show_interface_switchport[(port - 1)].trunking_vlans).forEach(element => {
      allowedVLANs += `${element}, `;
    });
    portVLAN2Input.value = allowedVLANs.slice(0, -2);
  }

};










// function toggleButtonStyles(clickedButton, otherButton) {
//   clickedButton.classList.remove('portSettingsButtonInactive');
//   clickedButton.classList.add('portSettingsButtonActive');
//   otherButton.classList.remove('portSettingsButtonActive');
//   otherButton.classList.add('portSettingsButtonInactive');
// }

// enablePortButton.addEventListener('click', function () { toggleButtonStyles(enablePortButton, disablePortButton); });
// disablePortButton.addEventListener('click', function () { toggleButtonStyles(disablePortButton, enablePortButton); });

// function changeVLANText(mode) {
//   if (mode == 'access') {
//     portVLAN1Display.innerText = 'VLAN';
//     portVLAN2Display.innerText = 'Voice VLAN';
//   } else if (mode == 'trunk') {
//     portVLAN1Display.innerText = 'Native VLAN';
//     portVLAN2Display.innerText = 'Allowed VLANs';
//   }
// }

// portAccessButton.addEventListener('click', function () {
//   toggleButtonStyles(portAccessButton, portTrunkButton);
//   changeVLANText('access');
// });
// portTrunkButton.addEventListener('click', function () {
//   toggleButtonStyles(portTrunkButton, portAccessButton);
//   changeVLANText('trunk');
// });


// function returnMainView() {
//   mainView.style.display = 'block';
//   focusView.style.display = 'none';
//   returnLink.style.display = 'none';
// }

// function focusPort(port) {
//   console.log(port)

//   var portDisplayNumbers = document.getElementsByName("portDisplayNumber");
//   portDisplayNumbers.forEach(element => {
//     element.style.fontWeight = (element.innerText == port) ? '700' : '600';
//   });

//   mainView.style.display = 'none';
//   focusView.style.display = 'block';
//   returnLink.style.display = 'block';
//   focusContent.style.display = 'none';
//   loadingAnimation2.style.display = 'block';

//   // Get Port Settings
//   fetch('/getPortSetting', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value, portNumber: port }) })
//     .then(response => response.text())
//     .then(text => {
//       focusContent.style.display = 'block';
//       loadingAnimation2.style.display = 'none';

//       // convert response to an array of json objects
//       var interfacesSettings = JSON.parse(text);
//       console.log(interfacesSettings);

//       // set switchPortDisplay to passed data
//       switchPortDisplay.innerText = `${hostname.innerText} / ${port}`;
//       // set portNameInput to passed data
//       portNameInput.value = interfacesSettings[0][(port - 1)].description;

//       // toggle enablePortButton and disablePortButton by the passed data
//       toggleButtonStyles((((interfacesSettings[0][(port - 1)].protocol_status).includes('disa')) ? disablePortButton : enablePortButton), (((interfacesSettings[0][(port - 1)].protocol_status).includes('disa')) ? enablePortButton : disablePortButton))

//       // toggle portAccessButton and portTrunkButton by the passed data
//       toggleButtonStyles((((interfacesSettings[1][(port - 1)].admin_mode).includes('a')) ? portAccessButton : portTrunkButton), (((interfacesSettings[1][(port - 1)].admin_mode).includes('a')) ? portTrunkButton : portAccessButton))

//       // set portVLAN1Display and portVLAN2Display to passed data
//       if ((interfacesSettings[1][(port - 1)].admin_mode).includes('a')) {
//         changeVLANText('access')
//         portVLAN1Input.value = interfacesSettings[1][(port - 1)].access_vlan;
//         portVLAN2Input.value = interfacesSettings[1][(port - 1)].voice_vlan;
//       } else {
//         changeVLANText('trunk')
//         portVLAN1Input.value = interfacesSettings[1][(port - 1)].native_vlan;
//         var allowedVLANs = '';
//         (interfacesSettings[1][(port - 1)].trunking_vlans).forEach(element => {
//           allowedVLANs += `${element}, `;
//         });
//         portVLAN2Input.value = allowedVLANs.slice(0, -2);
//       }

//     })

// }

// function getClients() {
//   fetch('/getClients', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
//     .then(response => response.text())
//     .then(text => {
//       var clients = text.split('*BR*');
      // for (let i = 0; i < clients.length; i++) {
      //   var client = clients[i].split('*AS*');
      //   var tableRow = document.createElement("tr");
      //   tableRow.innerHTML = `<td><span>${(i + 1)}</span></td><td>${client[0]}</span></td><td><span>${client[2]}</span></td><td><span>${client[1]}</span></td><td><span>${client[4]}</span></td><td><span>${client[3]}</span></td>`;
      //   clientTable.appendChild(tableRow);
      // }
//     })
// }

// function getHostname() {
//   fetch('/getHostname', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
//     .then(response => response.text())
//     .then(text => {
//       hostname.innerText = text;
//     })
// }

// function getDeviceInfo() {

//   fetch('/getDeviceInfo', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
//     .then(response => response.text())
//     .then(text => {
//       // Gateway, VLAN, DNS, Firmware, IntSummary, NumOfGig
//       text = text.split('*');
      // deviceInfo.ipAddress.innerHTML = `<b>IP ADDRESS</b><br>${hostField.value}`
      // deviceInfo.gateway.innerHTML = `<b>GATEWAY</b><br>${text[0].slice(0, -2)}`
      // deviceInfo.vlan.innerHTML = `<b>VLAN</b><br>${text[1]}`
      // deviceInfo.dns.innerHTML = `<b>DNS</b><br>${text[2]}`
      // deviceInfo.firmware.innerHTML = `<b>FIRMWARE</b><br>Version ${text[3]}`
      // loadingAnimation.style.display = 'none';

      // fastEthernetPorts = [];
      // for (var i = 0; i < text[4].length; i++) {
      //   fastEthernetPorts.push(text[4].charAt(i));
      // }

      // for (var i = 0; i < fastEthernetPorts.length; i++) {
      //   var tableHeader = document.createElement("th");
      //   tableHeader.innerHTML = `<span name="portDisplayNumber">${(i + 1)}</span>`;
      //   numberRow.appendChild(tableHeader);
      //   var tableData = document.createElement("td");
      //   tableData.innerHTML = `<img id="port${i}" src="/static/assets/${(fastEthernetPorts[i] == '1') ? 'active' : 'off'}-port.png" alt="port" onclick="focusPort(${(i + 1)})">`;
      //   portRow.appendChild(tableData);
      // }

      // var tableHeader = document.createElement("th");
      // tableHeader.innerHTML = `<span>&nbsp;</span>`;
      // numberRow.appendChild(tableHeader);
      // var tableData = document.createElement("td");
      // tableData.innerHTML = `<img src="" alt="">`;
      // tableData.style.cssText = 'border: none !important; cursor: default;'
      // portRow.appendChild(tableData);

//       gigabitEthernetPorts = [];
//       for (var i = 0; i < text[5].length; i++) {
//         gigabitEthernetPorts.push(text[5].charAt(i));
//       }

//       for (var i = 0; i < gigabitEthernetPorts.length; i++) {
        // var tableHeader = document.createElement("th");
        // tableHeader.innerHTML = `<span>${(fastEthernetPorts.length + (i + 1))}</span>`;
        // numberRow.appendChild(tableHeader);
        // var tableData = document.createElement("td");
        // tableData.innerHTML = `<img id="port${(fastEthernetPorts.length + (i + 1))}" src="/static/assets/${(gigabitEthernetPorts[i] == '1') ? 'active' : 'off'}-sfp.png" alt="port" onclick="focusPort(${fastEthernetPorts.length + (i + 1)})">`;
        // portRow.appendChild(tableData);
//       }

//     })
// }

// authenticate.addEventListener('click', function () {
//   loadingAnimation.style.display = 'block';

//   if (username.value == '' || generalPassword.value == '' || secretPassword.value == '') {
//     hostField.value = '192.168.0.1';
//     username.value = 'cisco';
//     generalPassword.value = 'password';
//     secretPassword.value = 'password';
//   }

//   fetch('/initConnection', { method: 'POST', body: JSON.stringify({ hostIP: hostField.value, username: username.value, generalPassword: generalPassword.value, secretPassword: secretPassword.value }) })
//     .then(response => response.text())
//     .then(text => {
//       console.log(text)
//       if (text === 'success') {
        // connectionText.innerText = 'Connection Active';
        // connectionText.style.color = '#20ab4e';
//         user.innerText = username.value;
//         getHostname();
//         getDeviceInfo();
//         getClients();
//       } else {
//         connectionText.innerText = 'Connection Failed';
//         connectionText.style.color = 'rgb(184, 0, 0)';
//         loadingAnimation.style.display = 'none';
//       }

//     })

// });
