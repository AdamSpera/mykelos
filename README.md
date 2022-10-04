# Mykelos

_Open-source localhost management web app for Cisco, HP, and Aruba networking systems._

## Introduction

Mykelos is a locally hosted Flask web application, offering a Cisco Meraki like experience for smaller scale networks and network scirpting across Cisco, HP, and Aruba networkign systems.

- Connect to Cisco, HP, and Aruba switches securely using SSH
- Switch user interface for ease of undertanding
- View switch's client details and information
- Ease of use through the StartMykelos.bat file
- View specific interface and port information
- Edit interface details, information, and configs
- Can use Mykelos completly offline and locally

Utilizing the functionality of NetMiko and ConnectHandler over SSH, Mykelos provides a comprehencive platform for network switch managment. Users can view, edit, and change switch details, port settings, and interface information, all from 127.0.0.1:5000.

## Usage

### Running the program

- To start Mykelos, run the ```OpenMykelos.bat``` file.

### Navigating the web application

1. If edge-popup !appear : Connect to ```http://127.0.0.1:5000/``` on any browser
2. Once on the web application, enter target switch details in the left fields
3. Click the ```Authenticate``` button to establish the connection

To view port and interface details, click on a port on the switch GUI display.

_Clicking the ```Update``` button will send all values coorisponding commands to the connected device._

## Installation 

### Easy Install (Reccomended)

If you already have Git and Python installed you can use the **EasyInstall.bat** file! 

~ **Download the ```EasyInstall.bat``` file at https://adamspera.dev/mykelos** ~

Recommended: Move the bat file to the desktop, and run it from there.

The program folder will be saved to the user desktop or at the same directory the bat file is ran from. If the folder does not appear, run the file again. 

### Manual Installation

#### Git and Cloning

1. Clone Mykelos to your desired directory and folder.
   - The MSI installer for Git can be found at https://git-scm.com/download/win
2. Clone NTC-Templates inside the mykelos directory folder.
   - Clone NTC-Templates from https://github.com/networktocode/ntc-templates.git 
   
#### Git Bash Variables

1. Open a Git Bash terminal in the Mykelos directory and enter the following line of code:
```
export NET_TEXTFSM="C:\ **PATH TO MYKELOS** \mykelos\ntc-templates\ntc_templates\templates"
```
2. Test that the command was successful by entering the following code: ```echo $NET_TEXTFSM```
  
#### Downloading Libraries

1. Open the command line and enter the following in the Mykelos folder:
```
mykelos-env\Scripts\activate
```
```
pip install netmiko
pip install ntc_templates
pip install Flask
```

## Contributions

Thank you to everybody who helped create the ScriptSwitch project possible!

Special mention and thanks to the following people:

- Testing Equipment: Bobby Connell

_Made by: Adam T Spera_
