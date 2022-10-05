var listOfCommands = {
  "cisco": [
    "dir",
    "show access-list",
    "show access-session",
    "show adjacency",
    "show alert counters",
    "show aliases",
    "show archive",
    "show authentication sessions",
    "show bfd neighbors details",
    "show boot",
    "show capability feature routing",
    "show cdp neighbors",
    "show cdp neighbors detail",
    "show clock",
    "show controller t1",
    "show crypto ipsec sa detail",
    "show crypto pki certificates",
    "show crypto session detail",
    "show dhcp lease",
    "show dmvpn",
    "show dot1x all",
    "show environment power all",
    "show environment temperature",
    "show etherchannel summary",
    "show hosts summary",
    "show interface transceiver",
    "show interfaces",
    "show interfaces description",
    "show interfaces status",
    "show interfaces switchport",
    "show inventory",
    "show ip access-lists",
    "show ip arp",
    "show ip bgp",
    "show ip bgp neighbors",
    "show ip bgp neighbors advertised-routes",
    "show ip bgp summary",
    "show ip bgp vpnv4 all neighbors",
    "show ip cef",
    "show ip cef detail",
    "show ip device tracking all",
    "show ip eigrp interfaces detail",
    "show ip eigrp neighbors",
    "show ip eigrp topology",
    "show ip flow toptalkers",
    "show ip interface",
    "show ip interface brief",
    "show ip mroute",
    "show ip nat translations",
    "show ip ospf database",
    "show ip ospf database network",
    "show ip ospf database router",
    "show ip ospf interface brief",
    "show ip ospf neighbor",
    "show ip prefix-list",
    "show ip route",
    "show ip route summary",
    "show ip source binding",
    "show ip vrf interfaces",
    "show ipv6 interface brief",
    "show ipv6 neighbors",
    "show isdn status",
    "show isis neighbors",
    "show license",
    "show lldp neighbors",
    "show lldp neighbors detail",
    "show logging",
    "show mac-address-table",
    "show module",
    "show module online diag",
    "show module status",
    "show module submodule",
    "show mpls interfaces",
    "show object-group",
    "show platform diag",
    "show port-security interface interface",
    "show power available",
    "show power status",
    "show power supplies",
    "show processes cpu",
    "show processes memory sorted",
    "show redundancy",
    "show route-map",
    "show running-config partition access-list",
    "show running-config partition route-map",
    "show snmp community",
    "show snmp group",
    "show snmp user",
    "show spanning-tree",
    "show standby",
    "show standby brief",
    "show switch detail",
    "show switch detail stack ports",
    "show tacacs",
    "show version",
    "show vlan",
    "show vrf",
    "show vrrp all",
    "show vrrp brief",
    "show vtp status",
    "traceroute"
  ],
  "hp": [
    "show arp",
    "show interfaces",
    "show interfaces brief",
    "show lldp info remote-device",
    "show lldp info remote-device detail",
    "show mac-address",
    "show port-security",
    "show system",
    "show tech buffers",
    "show trunks",
    "show vlans"
  ],
  "aruba": [
    "show ap database",
    "show ap database long",
    "show ap radio-database",
    "show arp",
    "show ip interface brief",
    "show ipv6 interface brief"
  ]
}

var user = document.getElementById('user');
var hostField = document.getElementById('hostField');
var username = document.getElementById('username');
var generalPassword = document.getElementById('generalPassword');
var secretPassword = document.getElementById('secretPassword');
var deviceTypeSelect = document.getElementById('deviceTypeSelect');
var authenticate = document.getElementById('authenticate');
var connectionText = document.getElementById('connectionText');
var loadingAnimation = document.getElementById('loadingAnimation');

var ciscoCustomCommandDiv = document.getElementById('ciscoCustomCommandDiv');
var ciscoCustomCommandInput = document.getElementById('ciscoCustomCommandInput');
var ciscoCustomCommandSend = document.getElementById('ciscoCustomCommandSend');
var ciscoCustomDisplayText = document.getElementById('ciscoCustomDisplayText');
var hpCustomCommandDiv = document.getElementById('hpCustomCommandDiv');
var hpCustomCommandInput = document.getElementById('hpCustomCommandInput');
var hpCustomCommandSend = document.getElementById('hpCustomCommandSend');
var hpDisplayCustomText = document.getElementById('hpDisplayCustomText');
var arubaCustomCommandDiv = document.getElementById('arubaCustomCommandDiv');
var arubaCustomCommandInput = document.getElementById('arubaCustomCommandInput');
var arubaCustomCommandSend = document.getElementById('arubaCustomCommandSend');
var arubaDisplayCustomText = document.getElementById('arubaDisplayCustomText');

var loadingAnimationCustom = document.getElementById('loadingAnimationCustom');

var hostname = document.getElementById('hostname');
var mainView = document.getElementById('mainView');
var focusView = document.getElementById('focusView');
var returnLink = document.getElementById('returnLink');

var deviceInfoTable = document.getElementById('deviceInfoTable');
var deviceInfo = {
  'ipAddress': document.getElementById('ipAddress'),
  'vlan': document.getElementById('vlan'),
  'gateway': document.getElementById('gateway'),
  'dns': document.getElementById('dns'),
  'firmware': document.getElementById('firmware')
}

var portInfoTable = document.getElementById('portInfoTable');
var portInfo = {
  'portAddress_Info': document.getElementById('portAddress_Info'),
  'mediaType_Info': document.getElementById('mediaType_Info'),
  'speed_info': document.getElementById('speed_info')
}

var numberRow = document.getElementById('numberRow');
var portRow = document.getElementById('portRow');
var clientTable = document.getElementById('clientTable');
var specificClientTable = document.getElementById('specificClientTable');

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
  deviceInfoTable.style.display = 'block';
  portInfoTable.style.display = 'none';
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

  hostField.value = '192.168.0.1'
  username.value = 'cisco'
  generalPassword.value = 'password'
  secretPassword.value = 'password'
  // deviceTypeSelect.value = 'cisco_ios'

  ciscoCustomCommandDiv.style.display = 'none';
  hpCustomCommandDiv.style.display = 'none';
  arubaCustomCommandDiv.style.display = 'none';
  
  loadingAnimation.style.display = 'block';

  var url = new URL("http://127.0.0.1:5000/");
  url.searchParams.append('host', hostField.value);
  url.searchParams.append('username', username.value);
  url.searchParams.append('generalPassword', generalPassword.value);
  url.searchParams.append('secretpassword', secretPassword.value);

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

      if (deviceTypeSelect.value == 'cisco_ios') {
        ciscoCustomCommandDiv.style.display = 'block';
      }
      if (deviceTypeSelect.value == 'hp_procurve') {
        hpCustomCommandDiv.style.display = 'block';
      }
      if (deviceTypeSelect.value == 'aruba_os') {
        arubaCustomCommandDiv.style.display = 'block';
      }

      hostField.disabled = true;
      username.disabled = true;
      generalPassword.disabled = true;
      secretPassword.disabled = true;
      deviceTypeSelect.disabled = true;
      authenticate.style.display = 'none';
      connectionText.style.marginTop = '-20px';
      connectionText.style.paddingTop = '-20px';

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

  deviceInfoTable.style.display = 'none';
  portInfoTable.style.display = 'block';

  // activate bold effect on port number
  document.getElementsByName("portDisplayNumber").forEach(element => {
    element.style.fontWeight = (element.innerText == port) ? '900' : '600';
  });

  // console.log( globalSwitchData.show_interfaces[port - 1].interface)
  portTitle.innerText = globalSwitchData.show_interfaces[port - 1].interface;

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

  // set portAddress from data
  portInfo.portAddress_Info.innerHTML = `<b>PORT ADDRESS</b><br>${globalSwitchData.show_interfaces[(port - 1)].address}`

  // set mediaType from data
  portInfo.mediaType_Info.innerHTML = `<b>MEDIA TYPE</b><br>${globalSwitchData.show_interfaces[(port - 1)].media_type}`

  // set portSpeed from data and set border to none
  portInfo.speed_info.innerHTML = `<b>SPEED</b><br>${globalSwitchData.show_interfaces[(port - 1)].speed}`
  portInfo.speed_info.style.border = 'none';

  // remove all but first row of sub client table
  for (var i = 1; i < specificClientTable.rows.length;) {
    specificClientTable.deleteRow(i);
  }

  // for every client in the client list
  var counter = 1;
  globalSwitchData.show_cdp_neighbors_detail.forEach(client => {
    if (client.local_port == portTitle.innerText) {
      var tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td><span>${counter}</span></td><td>${client.destination_host}</span></td><td><span>${client.management_ip}</span></td><td><span>${client.local_port}</span></td><td><span>${client.capabilities}</span></td><td><span>${client.platform}</span></td>`;
      specificClientTable.appendChild(tableRow);
      counter++;
    };
  });

}; // focusPort(port)

portSettingsUpdateButton.addEventListener('click', function () {
  portSettingsUpdateButton.disabled = true;

  var sendCommand = [
    [
      `interface ${portTitle.innerText}`,
      `description ${portNameInput.value}`
    ],
    [
      `interface ${portTitle.innerText}`,
      `${(enablePortButton.classList.contains('portSettingsButtonActive')) ? 'no shutdown' : 'shutdown'}`
    ],
    [
      `interface ${portTitle.innerText}`,
      `switchport mode ${(portAccessButton.classList.contains('portSettingsButtonActive')) ? 'access' : 'trunk'}`,
      `switchport ${(portAccessButton.classList.contains('portSettingsButtonActive')) ? 'access' : 'native'} vlan ${portVLAN1Input.value}`,
      `switchport ${(portAccessButton.classList.contains('portSettingsButtonActive')) ? 'voice' : 'trunk'} vlan ${portVLAN2Input.value}`
    ],
  ];

  // post /updatePort to Flask script
  fetch('/updatePort', { method: 'POST', body: JSON.stringify({ switchIP: hostField.value, switchUsername: username.value, switchGeneralPassword: generalPassword.value, switchSecretPassword: secretPassword.value, command: sendCommand }) })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      location.href = 'http://127.0.0.1:5000?host=' + hostField.value + '&username=' + username.value + '&generalPassword=' + generalPassword.value + '&secretPassword=' + secretPassword.value;
    });

});


// autofill for url params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
hostField.value = urlParams.get('host');
username.value = urlParams.get('username');
generalPassword.value = urlParams.get('generalPassword');
secretPassword.value = urlParams.get('secretPassword');
if (urlParams.get('host')) {
  authenticate.click();
};


// github button link
document.getElementById('githubicon').addEventListener('click', function () {
  location.href = 'https://github.com/AdamSpera/mykelos';
});


// CISCO fill custom send
var $input = $(".typeahead_C");
$input.typeahead({
  source: listOfCommands.cisco,
  autoSelect: true,
});
$input.change(function () {
  var current = $input.typeahead("getActive");
  matches = [];
  if (current) {
    if (current.name == $input.val()) {
      matches.push(current.name);
    }
  }
});
var $input = $(".typeahead_H");
$input.typeahead({
  source: listOfCommands.hp,
  autoSelect: true,
});
$input.change(function () {
  var current = $input.typeahead("getActive");
  matches = [];
  if (current) {
    if (current.name == $input.val()) {
      matches.push(current.name);
    }
  }
});
var $input = $(".typeahead_A");
$input.typeahead({
  source: listOfCommands.aruba,
  autoSelect: true,
});
$input.change(function () {
  var current = $input.typeahead("getActive");
  matches = [];
  if (current) {
    if (current.name == $input.val()) {
      matches.push(current.name);
    }
  }
});


// custom command send button click 
ciscoCustomCommandSend.addEventListener('click', function () {
  loadingAnimationCustom.style.display = 'block';
  fetch('/sendCustomCommand', { method: 'POST', body: JSON.stringify({ deviceType: deviceTypeSelect.value, switchIP: hostField.value, switchUsername: username.value, switchGeneralPassword: generalPassword.value, switchSecretPassword: secretPassword.value, customCommand: ciscoCustomCommandInput.value }) })
    .then(res => res.json())
    .then(res => {
      loadingAnimationCustom.style.display = 'none';
      ciscoCustomDisplayText.innerText = 'Response in console.';
      console.log(res)
    });
});
hpCustomCommandSend.addEventListener('click', function () {
  loadingAnimationCustom.style.display = 'block';
  fetch('/sendCustomCommand', { method: 'POST', body: JSON.stringify({ deviceType: deviceTypeSelect.value, switchIP: hostField.value, switchUsername: username.value, switchGeneralPassword: generalPassword.value, switchSecretPassword: secretPassword.value, customCommand: hpCustomCommandInput.value }) })
    .then(res => res.json())
    .then(res => {
      loadingAnimationCustom.style.display = 'none';
      hpDisplayCustomText.innerText = 'Response in console.';
      console.log(res)
    });
});
arubaCustomCommandSend.addEventListener('click', function () {
  loadingAnimationCustom.style.display = 'block';
  fetch('/sendCustomCommand', { method: 'POST', body: JSON.stringify({ deviceType: deviceTypeSelect.value, switchIP: hostField.value, switchUsername: username.value, switchGeneralPassword: generalPassword.value, switchSecretPassword: secretPassword.value, customCommand: arubaCustomCommandInput.value }) })
    .then(res => res.json())
    .then(res => {
      loadingAnimationCustom.style.display = 'none';
      arubaDisplayCustomText.innerText = 'Response in console.';
      console.log(res)
    });
});
