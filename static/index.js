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
}; // returnMainView()


// DISPLAY DEVICE DEVICE INFO
function displayDeviceInfo() {

  // set display switch ip address
  deviceInfo.ipAddress.innerHTML = `<b>IP ADDRESS</b><br>${hostField.value}`

  // set display switch gateway
  var gatewayText = globalSwitchData.show_running_config.split('ip default-gateway ')[1].split(' ')[0]
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

}; // displayDeviceInfo()


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

}; // displaySwitchGUI()


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
} // changeVLANText(mode)


// TOGGLE BUTTON FOR ACCESS VS TRUNK
portAccessButton.addEventListener('click', function () {
  toggleButtonStyles(portAccessButton, portTrunkButton);
  changeVLANText('access');
});
// TOGGLE BUTTON FOR ACCESS VS TRUNK
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

  // set enabled or disabled button style from data
  toggleButtonStyles((((globalSwitchData.show_interfaces[(port - 1)].protocol_status).includes('disa')) ? disablePortButton : enablePortButton), (((globalSwitchData.show_interfaces[(port - 1)].protocol_status).includes('disa')) ? enablePortButton : disablePortButton))

  // set access or trunk button style from data
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
