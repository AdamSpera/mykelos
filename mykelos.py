from flask import Flask
from flask import render_template
from netmiko import ConnectHandler
import inquirer
import json
import sys

cisco_881 = {
    'device_type': 'cisco_ios',
    'host':   '192.168.0.1',
    'username': 'cisco',
    'password': 'password',
    "secret": 'password',
}
net_connect = ConnectHandler(**cisco_881)
net_connect.enable()

print("Connection established!\n")

# Get the hostname of the device
# deviceHostname = net_connect.send_command("show running-config", use_textfsm=True).split('!')[2].split('hostname')[1].strip()
# print(deviceHostname)

# Get the interfaces of the device
# output = net_connect.send_command("show ip interface brief", use_textfsm=True)
# allInterfaces = []
# for i in output:
#     allInterfaces.append(i["intf"])
# print(allInterfaces)

# Flask options below \/ ----------------------------------------------

app = Flask(__name__, template_folder='template', static_folder='static')

@app.route("/")
def sendStatic():
    return render_template('index.html')