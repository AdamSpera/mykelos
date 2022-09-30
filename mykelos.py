from flask import Flask
from flask import request
from flask import render_template
from netmiko import ConnectHandler
import json
import sys

# def sendCommand(host, username, gPassword, sPassword, command):
    # # Connect to device via SSH
    # cisco_881 = {
    #     'device_type': 'cisco_ios',
    #     'host':   host,
    #     'username': username,
    #     'password': gPassword,
    #     "secret": sPassword,
    # }
    # # Initiate SSH connection
    # net_connect = ConnectHandler(**cisco_881)
    # # Enter enable mode
    # net_connect.enable()
    # # Confirmation message
    # print(" # Connection established!\n")
    # # Save result locally
    # sendBack = net_connect.send_command(command, use_textfsm=True)
    # # Disconnect from device
    # net_connect.disconnect()
    # # Send passed command
    # return sendBack

# Create and initialized the Flask app
app = Flask(__name__, template_folder='template', static_folder='static')

@app.route("/")
def sendStatic():
    # Return the index.html file
    return render_template('index.html')

@app.route('/getSwitchData', methods=['POST'])
def getSwitchData():
    postData = json.loads(request.data.decode("utf-8"))

    # Connect to device via SSH
    cisco_881 = {
        'device_type': 'cisco_ios',
        'host':   postData['switchIP'],
        'username': postData['switchUsername'],
        'password': postData['switchGeneralPassword'],
        "secret": postData['switchSecretPassword'],
    }
    # Initiate SSH connection
    net_connect = ConnectHandler(**cisco_881)
    # Enter enable mode
    net_connect.enable()
    # Confirmation message
    print(" # Connection established!")
    
    show_running_config = net_connect.send_command('show running-config', use_textfsm=True)
    show_interfaces = net_connect.send_command('show interfaces', use_textfsm=True)
    for interface in show_interfaces:
        if 'lan' in interface['interface']:
            show_interfaces.remove(interface)
    show_ip_interface_brief = net_connect.send_command('show ip interface brief', use_textfsm=True)
    show_vlan_brief = net_connect.send_command('show vlan brief', use_textfsm=True)
    show_cdp_neighbors_detail = net_connect.send_command('show cdp neighbors detail', use_textfsm=True)
    show_interface_switchport = net_connect.send_command('show interface switchport', use_textfsm=True)

    commandResults = {
        'show_running_config': show_running_config, 
        'show_interfaces': show_interfaces, 
        'show_ip_interface_brief': show_ip_interface_brief, 
        'show_vlan_brief': show_vlan_brief, 
        'show_cdp_neighbors_detail': show_cdp_neighbors_detail,
        'show_interface_switchport': show_interface_switchport
    }

    # Disconnect from device
    net_connect.disconnect()

    # Return all compiled data 
    return commandResults



















# @app.route('/getPortSetting', methods=['POST'])
# def getPortSetting():
#     passedData = json.loads(request.data.decode("utf-8"))
#     # Return the show interfaces from device
#     generalPortRaw = sendCommand(passedData['hostIP'], passedData['username'], passedData['generalPassword'], passedData['secretPassword'], "show interfaces")
#     switchportRaw = sendCommand(passedData['hostIP'], passedData['username'], passedData['generalPassword'], passedData['secretPassword'], "show interface switchport")

#     portSettings = [[], []]

#     for port in generalPortRaw:
#         if 'lan' not in port['interface']:
#             portSettings[0].append(
#                 {
#                 'interface': port['interface'],
#                 'description': port['description'],
#                 'protocol_status': port['protocol_status']
#                 }
#             )

#     for port in switchportRaw:
#         portSettings[1].append(
#             {
#                 'interface': port['interface'],
#                 'admin_mode': port['admin_mode'],
#                 'access_vlan': port['access_vlan'],
#                 'voice_vlan': port['voice_vlan'],
#                 'native_vlan': port['native_vlan'],
#                 'trunking_vlans': port['trunking_vlans'],
#             }
#         )

#     return portSettings

# @app.route('/getClients', methods=['POST'])
# def getClients():
#     passedData = json.loads(request.data.decode("utf-8"))
    
#     clientFullList = sendCommand(passedData['hostIP'], passedData['username'], passedData['generalPassword'], passedData['secretPassword'], "show cdp neighbors detail")

#     sendBack = ''
#     for i in clientFullList:
#         stringToPush = ''
#         stringToPush += i['destination_host'] + '*AS*' + i['local_port'] + '*AS*' + i['management_ip'] + '*AS*' + i['platform'] + '*AS*' + i['capabilities'] + '*BR*'
#         sendBack += stringToPush

#     if (sendBack.endswith('*BR*')):
#         sendBack = sendBack[:-4]
    
#     return sendBack

# @app.route('/getHostname', methods=['POST'])
# def getHostname():
#     passedData = json.loads(request.data.decode("utf-8"))
#     # Return the hostname of the device
#     return sendCommand(passedData['hostIP'], passedData['username'], passedData['generalPassword'], passedData['secretPassword'], "show running-config").split('!')[2].split('hostname')[1].strip()

# @app.route('/getDeviceInfo', methods=['POST'])
# def getDeviceInfo():
#     passedData = json.loads(request.data.decode("utf-8"))
#     # Return the hostname of the device
#     showRunning = sendCommand(passedData['hostIP'], passedData['username'], passedData['generalPassword'], passedData['secretPassword'], "show running-config")
#     gatewayReturn = showRunning.split('ip default-gateway ')[1].split(' ')[0]
#     vlanReturn = sendCommand(passedData['hostIP'], passedData['username'], passedData['generalPassword'], passedData['secretPassword'], "show vlan brief")
    # for i in vlanReturn:
    #     if i['name'] == 'default':
    #         vlanReturn = i['vlan_id']
#     dnsReturn = showRunning.split('ip domain-name ')[1].split('!')[0]
#     firmwareReturn = showRunning.split('version ')[1].split('no')[0]
#     intSumReturn = sendCommand(passedData['hostIP'], passedData['username'], passedData['generalPassword'], passedData['secretPassword'], "show ip interface brief")
#     intSumParsedReturn = ''
#     gigabitPorts = ''
#     for i in intSumReturn:
#         if i['status'] == 'up' and 'lan' not in i['intf'] and 'abit' not in i['intf']:
#             intSumParsedReturn += '1'
#         elif i['status'] == 'down' and 'lan' not in i['intf'] and 'abit' not in i['intf']:
#             intSumParsedReturn += '0'
#     for i in intSumReturn:
#         if 'abit' in i['intf'] and i['status'] == 'up':
#             gigabitPorts += '1'
#         elif 'abit' in i['intf'] and i['status'] == 'down':
#             gigabitPorts += '0'
#     return gatewayReturn + "*" + vlanReturn + "*" + dnsReturn + "*" + firmwareReturn + "*" + intSumParsedReturn + "*" + gigabitPorts

# @app.route('/getInterfaces', methods=['GET'])
# def getInterfaces():
#     # Return the interface brief of the device
#     return net_connect.send_command("show ip interface brief", use_textfsm=True)

# @app.route('/initConnection', methods=['POST'])
# def initConnection():
#     passedData = json.loads(request.data.decode("utf-8"))

#     # Connect to device via SSH
#     cisco_881 = {
#         'device_type': 'cisco_ios',
#         'host':   passedData['hostIP'],
#         'username': passedData['username'],
#         'password': passedData['generalPassword'],
#         "secret": passedData['secretPassword'],
#     }
#     # Initiate SSH connection
#     net_connect = ConnectHandler(**cisco_881)
#     # Enter enable mode
#     net_connect.enable()
#     # Confirmation message
#     print(" # Connection established!\n")
#     # Disconnect from device
#     net_connect.disconnect()

#     return 'success'
