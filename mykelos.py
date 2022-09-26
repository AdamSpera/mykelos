from flask import Flask
from flask import render_template

app = Flask(__name__, template_folder='template', static_folder='static')

@app.route("/")
def sendStatic():
    return render_template('index.html')