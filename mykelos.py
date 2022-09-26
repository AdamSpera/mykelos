from flask import Flask
from flask import render_template
from netmiko import ConnectHandler
import inquirer
import json
import sys

cisco_881 = {
    'device_type': 'cisco_ios',
    'host':   '172.168.0.1',
    'username': 'cisco',
    'password': 'password',
    "secret": 'password',
}
net_connect = ConnectHandler(**cisco_881)
net_connect.enable()
print("Connection established!\n")

# app = Flask(__name__, template_folder='template', static_folder='static')

# @app.route("/")
# def sendStatic():
#     return render_template('index.html')