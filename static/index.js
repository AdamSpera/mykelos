var listOfCommands = {
  "cisco": [
    "cisco apic fabric show vlan extended",
    "cisco asa dir",
    "cisco asa ping",
    "cisco asa show access-list",
    "cisco asa show arp",
    "cisco asa show asp drop",
    "cisco asa show asp table vpn-context detail",
    "cisco asa show bgp summary",
    "cisco asa show cpu usage detailed",
    "cisco asa show crypto ikev1 sa detail",
    "cisco asa show crypto ipsec sa",
    "cisco asa show failover",
    "cisco asa show interface",
    "cisco asa show interface detail",
    "cisco asa show inventory",
    "cisco asa show license all",
    "cisco asa show logging",
    "cisco asa show name",
    "cisco asa show nat",
    "cisco asa show object-group network",
    "cisco asa show resource usage",
    "cisco asa show route",
    "cisco asa show running-config all crypto map",
    "cisco asa show running-config crypto ikev1",
    "cisco asa show running-config crypto map",
    "cisco asa show running-config ipsec",
    "cisco asa show running-config object network",
    "cisco asa show running-config tunnel-group",
    "cisco asa show version",
    "cisco asa show vpn-sessiondb",
    "cisco asa show vpn-sessiondb anyconnect",
    "cisco asa show vpn-sessiondb detail l2l",
    "cisco asa show xlate",
    "cisco ios dir",
    "cisco ios show access-list",
    "cisco ios show access-session",
    "cisco ios show adjacency",
    "cisco ios show alert counters",
    "cisco ios show aliases",
    "cisco ios show archive",
    "cisco ios show authentication sessions",
    "cisco ios show bfd neighbors details",
    "cisco ios show boot",
    "cisco ios show capability feature routing",
    "cisco ios show cdp neighbors",
    "cisco ios show cdp neighbors detail",
    "cisco ios show clock",
    "cisco ios show controller t1",
    "cisco ios show crypto ipsec sa detail",
    "cisco ios show crypto pki certificates",
    "cisco ios show crypto session detail",
    "cisco ios show dhcp lease",
    "cisco ios show dmvpn",
    "cisco ios show dot1x all",
    "cisco ios show environment power all",
    "cisco ios show environment temperature",
    "cisco ios show etherchannel summary",
    "cisco ios show hosts summary",
    "cisco ios show interface transceiver",
    "cisco ios show interfaces",
    "cisco ios show interfaces description",
    "cisco ios show interfaces status",
    "cisco ios show interfaces switchport",
    "cisco ios show inventory",
    "cisco ios show ip access-lists",
    "cisco ios show ip arp",
    "cisco ios show ip bgp",
    "cisco ios show ip bgp neighbors",
    "cisco ios show ip bgp neighbors advertised-routes",
    "cisco ios show ip bgp summary",
    "cisco ios show ip bgp vpnv4 all neighbors",
    "cisco ios show ip cef",
    "cisco ios show ip cef detail",
    "cisco ios show ip device tracking all",
    "cisco ios show ip eigrp interfaces detail",
    "cisco ios show ip eigrp neighbors",
    "cisco ios show ip eigrp topology",
    "cisco ios show ip flow toptalkers",
    "cisco ios show ip interface",
    "cisco ios show ip interface brief",
    "cisco ios show ip mroute",
    "cisco ios show ip nat translations",
    "cisco ios show ip ospf database",
    "cisco ios show ip ospf database network",
    "cisco ios show ip ospf database router",
    "cisco ios show ip ospf interface brief",
    "cisco ios show ip ospf neighbor",
    "cisco ios show ip prefix-list",
    "cisco ios show ip route",
    "cisco ios show ip route summary",
    "cisco ios show ip source binding",
    "cisco ios show ip vrf interfaces",
    "cisco ios show ipv6 interface brief",
    "cisco ios show ipv6 neighbors",
    "cisco ios show isdn status",
    "cisco ios show isis neighbors",
    "cisco ios show license",
    "cisco ios show lldp neighbors",
    "cisco ios show lldp neighbors detail",
    "cisco ios show logging",
    "cisco ios show mac-address-table",
    "cisco ios show module",
    "cisco ios show module online diag",
    "cisco ios show module status",
    "cisco ios show module submodule",
    "cisco ios show mpls interfaces",
    "cisco ios show object-group",
    "cisco ios show platform diag",
    "cisco ios show port-security interface interface",
    "cisco ios show power available",
    "cisco ios show power status",
    "cisco ios show power supplies",
    "cisco ios show processes cpu",
    "cisco ios show processes memory sorted",
    "cisco ios show redundancy",
    "cisco ios show route-map",
    "cisco ios show running-config partition access-list",
    "cisco ios show running-config partition route-map",
    "cisco ios show snmp community",
    "cisco ios show snmp group",
    "cisco ios show snmp user",
    "cisco ios show spanning-tree",
    "cisco ios show standby",
    "cisco ios show standby brief",
    "cisco ios show switch detail",
    "cisco ios show switch detail stack ports",
    "cisco ios show tacacs",
    "cisco ios show version",
    "cisco ios show vlan",
    "cisco ios show vrf",
    "cisco ios show vrrp all",
    "cisco ios show vrrp brief",
    "cisco ios show vtp status",
    "cisco ios traceroute",
    "cisco nxos show access-lists",
    "cisco nxos show cdp neighbors",
    "cisco nxos show cdp neighbors detail",
    "cisco nxos show clock",
    "cisco nxos show configuration session summary",
    "cisco nxos show cts interface all",
    "cisco nxos show cts interface brief",
    "cisco nxos show environment",
    "cisco nxos show environment temperature",
    "cisco nxos show feature",
    "cisco nxos show fex",
    "cisco nxos show fex id",
    "cisco nxos show flogi database",
    "cisco nxos show forwarding adjacency",
    "cisco nxos show forwarding ipv4 route",
    "cisco nxos show hostname",
    "cisco nxos show hsrp all",
    "cisco nxos show interface",
    "cisco nxos show interface brief",
    "cisco nxos show interface description",
    "cisco nxos show interface status",
    "cisco nxos show interface transceiver",
    "cisco nxos show interface transceiver details",
    "cisco nxos show interfaces switchport",
    "cisco nxos show inventory",
    "cisco nxos show ip adjacency",
    "cisco nxos show ip arp",
    "cisco nxos show ip arp detail",
    "cisco nxos show ip bgp",
    "cisco nxos show ip bgp neighbors",
    "cisco nxos show ip bgp summary",
    "cisco nxos show ip bgp summary vrf",
    "cisco nxos show ip community-list",
    "cisco nxos show ip dhcp relay address",
    "cisco nxos show ip dhcp snooping statistics",
    "cisco nxos show ip interface",
    "cisco nxos show ip interface brief",
    "cisco nxos show ip interface vrf all",
    "cisco nxos show ip ospf database",
    "cisco nxos show ip ospf neighbor",
    "cisco nxos show ip route",
    "cisco nxos show ipv6 interface brief",
    "cisco nxos show l2rib internal permanently-frozen-list",
    "cisco nxos show license usage",
    "cisco nxos show lldp neighbors",
    "cisco nxos show lldp neighbors detail",
    "cisco nxos show mac address-table",
    "cisco nxos show module",
    "cisco nxos show port-channel summary",
    "cisco nxos show processes cpu",
    "cisco nxos show route-map",
    "cisco nxos show vdc",
    "cisco nxos show version",
    "cisco nxos show vlan",
    "cisco nxos show vpc",
    "cisco nxos show vrf",
    "cisco nxos show vrf interface",
    "cisco s300 show interfaces status",
    "cisco s300 show lldp neighbors",
    "cisco s300 show mac address-table",
    "cisco s300 show version",
    "cisco wlc ssh show 802",
    "cisco wlc ssh show 802",
    "cisco wlc ssh show advanced 802",
    "cisco wlc ssh show ap config general",
    "cisco wlc ssh show ap image all",
    "cisco wlc ssh show ap summary",
    "cisco wlc ssh show band-select",
    "cisco wlc ssh show cdp neighbors detail",
    "cisco wlc ssh show client detail",
    "cisco wlc ssh show exclusionlist",
    "cisco wlc ssh show interface detailed id",
    "cisco wlc ssh show interface summary",
    "cisco wlc ssh show inventory",
    "cisco wlc ssh show mobility anchor",
    "cisco wlc ssh show mobility sum",
    "cisco wlc ssh show port summary",
    "cisco wlc ssh show radius summary",
    "cisco wlc ssh show redundancy detail",
    "cisco wlc ssh show redundancy summary",
    "cisco wlc ssh show rf-profile summary",
    "cisco wlc ssh show stats port summary",
    "cisco wlc ssh show sysinfo",
    "cisco wlc ssh show tacacs summary",
    "cisco wlc ssh show time",
    "cisco wlc ssh show wlan sum",
    "cisco xr admin show controller fabric health",
    "cisco xr admin show environment fan",
    "cisco xr admin show environment power",
    "cisco xr admin show inventory",
    "cisco xr admin show platform",
    "cisco xr admin show vm",
    "cisco xr show arp",
    "cisco xr show asic-errors all location",
    "cisco xr show bfd sessions",
    "cisco xr show bgp",
    "cisco xr show bgp neighbors",
    "cisco xr show bgp vrf all ipv4 unicast summary",
    "cisco xr show cdp neighbors detail",
    "cisco xr show cef drops location",
    "cisco xr show configuration commit list",
    "cisco xr show controller fabric plane all",
    "cisco xr show controllers HundredGigabitEthernet",
    "cisco xr show controllers all phy",
    "cisco xr show controllers fabric fia drops egress location",
    "cisco xr show controllers fabric fia drops ingress location",
    "cisco xr show controllers fabric fia errors egress location",
    "cisco xr show controllers fabric fia errors ingress location",
    "cisco xr show dhcp ipv4 proxy binding",
    "cisco xr show drops np all",
    "cisco xr show hsrp",
    "cisco xr show install active",
    "cisco xr show interface brief",
    "cisco xr show interfaces",
    "cisco xr show interfaces summary",
    "cisco xr show ip bgp summary",
    "cisco xr show ip interface brief",
    "cisco xr show ip route",
    "cisco xr show ipv4 interface",
    "cisco xr show ipv6 neighbors",
    "cisco xr show isis neighbors",
    "cisco xr show lldp neighbors",
    "cisco xr show lpts pifib hardware police location",
    "cisco xr show mpls ldp neighbor brief",
    "cisco xr show ospf neighbor",
    "cisco xr show pim neighbor",
    "cisco xr show processes cpu",
    "cisco xr show redundancy summary",
    "cisco xr show rsvp neighbors",
    "cisco xr show version"
  ],
  "hp": [
    "cisco ios show interfaces switchport",
    "cisco nxos show interfaces switchport",
    "hp comware display arp",
    "hp comware display clock",
    "hp comware display counters bound interface",
    "hp comware display device manuinfo",
    "hp comware display ip interface",
    "hp comware display ip routing-table",
    "hp comware display lldp neighbor-information verbose",
    "hp comware display mac-address",
    "hp comware display vlan brief",
    "hp procurve show arp",
    "hp procurve show interfaces",
    "hp procurve show interfaces brief",
    "hp procurve show lldp info remote-device",
    "hp procurve show lldp info remote-device detail",
    "hp procurve show mac-address",
    "hp procurve show port-security",
    "hp procurve show system",
    "hp procurve show tech buffers",
    "hp procurve show trunks",
    "hp procurve show vlans"
  ],
  "aruba": [
    "aruba aoscx show aaa authentication port-access interface all client-status",
    "aruba aoscx show arp all-vrfs",
    "aruba aoscx show bfd all-vrfs",
    "aruba aoscx show bgp all-vrfs all summary",
    "aruba aoscx show bgp all all-vrfs summary",
    "aruba aoscx show interface",
    "aruba aoscx show interface dom detail",
    "aruba aoscx show ip route all-vrfs",
    "aruba aoscx show lldp neighbors-info detail",
    "aruba aoscx show mac-address-table",
    "aruba aoscx show ntp associations",
    "aruba aoscx show vsf detail",
    "aruba os show ap database",
    "aruba os show ap database long",
    "aruba os show ap radio-database",
    "aruba os show arp",
    "aruba os show ip interface brief",
    "aruba os show ipv6 interface brief"
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

var customCommandDiv = document.getElementById('customCommandDiv');
var customCommandInput = document.getElementById('customCommandInput');
var customCommandSend = document.getElementById('customCommandSend');

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

      customCommandDiv.style.display = 'block';

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


// auto fill search bar
var $input = $(".typeahead");
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

customCommandSend.addEventListener('click', function () {
  console.log(customCommandInput.value)
  var commandSplitted = customCommandInput.value.split(' ');
  commandSplitted.shift();
  commandSplitted.shift();
  var commandBody = '';
  for (var i = 0; i < commandSplitted.length; i++) {
    commandBody += commandSplitted[i] + ' ';
  }
  fetch('/sendCustomCommand', { method: 'POST', body: JSON.stringify({deviceType: customCommandInput.value.split(' ')[0] + '_' + customCommandInput.value.split(' ')[1], switchIP: hostField.value, switchUsername: username.value, switchGeneralPassword: generalPassword.value, switchSecretPassword: secretPassword.value, customCommand: commandBody.trim() }) })
    .then(res => res.json())
    .then(res => {
      document.getElementById('displayCustomText').innerText = 'Response in console.';
      console.log(res)
    });
});
