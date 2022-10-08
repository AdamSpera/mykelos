from flask import Flask
from flask import request
from flask import render_template
from netmiko import ConnectHandler
import json
import sys

# Create and initialized the Flask app
app = Flask(__name__, template_folder='template', static_folder='static')

@app.route("/")
def sendStatic():

    f = open("static/remember.txt", "r")
    f = f.read()

    # Return the index.html file
    return render_template(f if f else 'index.html')
    
@app.route("/cisco")
def sendCisco():
    # Return the cisco.html file
    return render_template('cisco.html')

@app.route("/rememberChoice", methods=['POST'])
def rememberChoice():
    postData = json.loads(request.data.decode("utf-8"))

    f = open("static/remember.txt", "w")
    f.write(postData['userChoice'] + '.html')
    f.close()

    # Return the index.html file
    return {'complete': True}

@app.route("/removeRemember", methods=['GET'])
def removeRemember():

    f = open("static/remember.txt", "w")
    f.write('')
    f.close()

    # Return the index.html file
    return {'complete': True}

@app.route("/updatePort_Cisco", methods=['POST'])
def updatePort_Cisco():
    postData = json.loads(request.data.decode("utf-8"))

    # Connect to device via SSH
    cisco_881 = {
        'device_type': 'cisco_ios',
        'host':   postData['switchIP'],
        'username': postData['switchUsername'],
        'password': postData['switchGeneralPassword'],
        "secret": postData['switchSecretPassword'],
    }
    del postData['switchIP']
    del postData['switchUsername']
    del postData['switchGeneralPassword']
    del postData['switchSecretPassword']
    # Initiate SSH connection
    net_connect = ConnectHandler(**cisco_881)
    # Enter enable mode
    net_connect.enable()
    # Enter configure terminal
    net_connect.config_mode()
    # Confirmation message
    print(" # Connection established!")

    # Send all compound commands sent
    for compoundCommand in postData['command']:
        net_connect.send_config_set(compoundCommand)

    # Return the index.html file
    return {'complete': True}

@app.route('/getSwitchData_Cisco', methods=['POST'])
def getSwitchData_Cisco():
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

    # show_lldp_neighbors_detail = net_connect.send_command('show lldp neighbors detail', use_textfsm=True)
    # show_lldp_neighbors = net_connect.send_command('show lldp neighbors', use_textfsm=True)

    # commandResults = {
    #     'show_running_config': show_running_config, 
    #     'show_interfaces': show_interfaces, 
    #     'show_ip_interface_brief': show_ip_interface_brief, 
    #     'show_vlan_brief': show_vlan_brief, 
    #     'show_interface_switchport': show_interface_switchport,
    #     'show_cdp_neighbors_detail': show_cdp_neighbors_detail,
    #     'show_lldp_neighbors_detail': show_lldp_neighbors_detail,
    #     'show_lldp_neighbors': show_lldp_neighbors
    # }

    # enable lldp on switch 
    net_connect.config_mode()
    net_connect.send_command('lldp run')
    # Disconnect from device
    net_connect.disconnect()

    # Initiate SSH connection
    net_connect = ConnectHandler(**cisco_881)
    # Enter enable mode
    net_connect.enable()

    show_lldp_neighbors_detail = net_connect.send_command('show lldp neighbors detail', use_textfsm=True)
    show_lldp_neighbors = net_connect.send_command('show lldp neighbors', use_textfsm=True)

    commandResults = {
        'show_running_config': show_running_config, 
        'show_interfaces': show_interfaces, 
        'show_ip_interface_brief': show_ip_interface_brief, 
        'show_vlan_brief': show_vlan_brief, 
        'show_interface_switchport': show_interface_switchport,
        'show_cdp_neighbors_detail': show_cdp_neighbors_detail,
        'show_lldp_neighbors_detail': show_lldp_neighbors_detail,
        'show_lldp_neighbors': show_lldp_neighbors
    }

    # Return all compiled data 
    return commandResults

@app.route('/sendCustomCommand_Cisco', methods=['POST'])
def sendCustomCommand_Cisco():
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
    
    customResponse = net_connect.send_command(postData['customCommand'], use_textfsm=True)

    # Disconnect from device
    net_connect.disconnect()

    # Return all compiled data 
    return {'response': customResponse}

