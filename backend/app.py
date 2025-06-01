from flask import Flask, send_from_directory
from config import Config
from models import db
from routes import bp
from flask_cors import CORS
import os

app = Flask(__name__, static_folder=os.path.abspath('../frontend'), static_url_path='')

app.config.from_object(Config)

db.init_app(app)
CORS(app)
app.register_blueprint(bp)

# Cria as tabelas antes de iniciar o servidor
with app.app_context():
    db.create_all()

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    print("Acesse o frontend no navegador em: http://localhost:8080/")
    app.run(debug=True, host='0.0.0.0', port=8080)


