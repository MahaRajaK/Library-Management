import smtplib
from flask import Flask,request

app  = Flask(__name__)

@app.get("/sendemail")
def index():
    receiver = request.args.get("email")
    subject = request.args.get("subject")
    body = request.args.get("message")

    # Set up the SMTP server
    smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_server.starttls()
    smtp_server.login('noreply290602@gmail.com', 'Maha2002**')

    # Compose the email
    sender = 'noreply290602@gmail.com'
    message = f'Subject: {subject}\n\n{body}'

    # Send the email
    smtp_server.sendmail(sender, receiver, message)

    # Close the connection
    smtp_server.quit()
    return "seccess"


app.run()