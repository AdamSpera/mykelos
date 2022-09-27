from flask import Flask
from flask import request
from flask import render_template
from netmiko import ConnectHandler
import inquirer
import json
import sys

def sendCommand(host, username, gPassword, sPassword, command):
    # Connect to device via SSH
    cisco_881 = {
        'device_type': 'cisco_ios',
        'host':   host,
        'username': username,
        'password': gPassword,
        "secret": sPassword,
    }
    # Initiate SSH connection
    net_connect = ConnectHandler(**cisco_881)
    # Enter enable mode
    net_connect.enable()
    # Confirmation message
    print(" # Connection established!\n")
    # Save result locally
    sendBack = net_connect.send_command(command, use_textfsm=True)
    # Disconnect from device
    net_connect.disconnect()
    # Send passed command
    return sendBack

# Create and initialized the Flask app
app = Flask(__name__, template_folder='template', static_folder='static')

@app.route("/")
def sendStatic():
    # Return the index.html file
    return render_template('index.html')

@app.route('/getHostname', methods=['POST'])
def getHostname():
    passedData = json.loads(request.data.decode("utf-8"))
    # Return the hostname of the device
    # return net_connect.send_command("show running-config", use_textfsm=True).split('!')[2].split('hostname')[1].strip()
    return sendCommand(passedData['hostIP'], passedData['username'], passedData['generalPassword'], passedData['secretPassword'], "show running-config").split('!')[2].split('hostname')[1].strip()

@app.route('/getInterfaces', methods=['GET'])
def getInterfaces():
    # Return the interface brief of the device
    return net_connect.send_command("show ip interface brief", use_textfsm=True)

@app.route('/initConnection', methods=['POST'])
def initConnection():
    passedData = json.loads(request.data.decode("utf-8"))

    # Connect to device via SSH
    cisco_881 = {
        'device_type': 'cisco_ios',
        'host':   passedData['hostIP'],
        'username': passedData['username'],
        'password': passedData['generalPassword'],
        "secret": passedData['secretPassword'],
    }
    # Initiate SSH connection
    net_connect = ConnectHandler(**cisco_881)
    # Enter enable mode
    net_connect.enable()
    # Confirmation message
    print(" # Connection established!\n")
    # Disconnect from device
    net_connect.disconnect()

    return 'success'
