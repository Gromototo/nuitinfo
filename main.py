from flask import Flask, render_template
from flask_sslify import SSLify
from flask import send_from_directory
from flask_mail import Mail, Message
from flask import request
from flask import send_file

app = Flask(__name__)
sslify = SSLify(app)


# Configuration pour l'envoi de mails
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Entrez votre serveur SMTP ici
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'rodlpd51@gmail.com'  # Entrez votre nom d'utilisateur SMTP ici
app.config['MAIL_PASSWORD'] = 'kjsz vyav ymtf rguv'

mail = Mail(app)

@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/main")
def main():
    return render_template("main.html")

@app.route("/Hierar.html")
def Hierar():
    return render_template("Hierar.html")

@app.route("/VIMonths.html")
def VIMonths():
    return render_template("VIMonths.html")

@app.route("/GarageArlac.html")
def GarageArlac():
    return render_template("GarageArlac.html")

@app.route("/AtelierArk.html")
def AtelierArk():
    return render_template("AtelierArk.html")


@app.route("/TIPE.html")
def TIPE():
    return render_template("TIPE.html")


@app.route("/BenchMarker.html")
def BenchMarker():
    return render_template("BenchMarker.html")

@app.route("/DMTracer.html")
def DMTracer():
    return render_template("DMTracer.html")

@app.route('/images/<path:path>')
def send_image(path):
    return send_from_directory('images', path)


@app.route('/send_mail', methods=['POST'])
def send_mail():
    if request.method == 'POST':
        print("HERE")
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        msg = Message(subject='Message from Your Website',
                      sender=email,
                      recipients=['rodlpd51@gmail.com'])  # Entrez votre adresse e-mail ici

        msg.body = f"Name: {name}\nEmail: {email}\nMessage: {message}"
        mail.send(msg)
        return "Votre message a bien été envoyé !" # Renvoie la page avec une indication de réussite d'envoi

@app.route('/download')
def downloadFile ():
    #For windows you need to use drive name [ex: F:/Example.pdf]
    path = "./files/CVc-RodrigueLEITAO--PEREIRADIAS.pdf"
    return send_file(path, as_attachment=True)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=False)
