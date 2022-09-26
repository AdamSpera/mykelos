from flask import Flask
from flask import request
from flask import render_template
from netmiko import ConnectHandler
import inquirer
import json
import sys

# Create and initialized the Flask app
app = Flask(__name__, template_folder='template', static_folder='static')

# Connect to device via SSH
cisco_881 = {
    'device_type': 'cisco_ios',
    'host':   '192.168.0.1',
    'username': 'cisco',
    'password': 'password',
    "secret": 'password',
}
# Initiate SSH connection
net_connect = ConnectHandler(**cisco_881)
# Enter enable mode
net_connect.enable()
# Confirmation message
print(" # Connection established!\n")

@app.route("/")
def sendStatic():
    # Return the index.html file
    return render_template('index.html')

@app.route('/getHostname', methods=['GET'])
def getHostname():
    # Return the hostname of the device
    return net_connect.send_command("show running-config", use_textfsm=True).split('!')[2].split('hostname')[1].strip()

@app.route('/getInterfaces', methods=['GET'])
def getInterfaces():

    return net_connect.send_command("show ip interface brief", use_textfsm=True)

    # allInterfaces= []
    # # Get all interfaces from device
    # for i in net_connect.send_command("show ip interface brief", use_textfsm=True):
    #     allInterfaces.append(i["intf"])
    # # Return all interfaces
    # return allInterfaces

