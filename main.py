from flask import Flask, render_template
import config

app = Flask(__name__)
app.config['SECRET_KEY'] = config.SECRET_KEY

@app.route('/')
def home():
    return render_template('layout.html')

if __name__ == '__main__':
    app.run(debug=True)
