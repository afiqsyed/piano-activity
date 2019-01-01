import os
import sqlite3
from flask import Flask, request, render_template, send_from_directory, jsonify

app = Flask(__name__, static_folder=None)

CLIENT_FOLDER = os.path.abspath('../client/build')
DATABASE_LOCATION = os.path.abspath('../server/data.db')
TRACK_ID = 0

@app.route('/')
def welcome():    
    return render_template('welcome.html')

@app.route('/note/<int:sequence>', methods=['GET', 'POST'])
def note(sequence):
    database_connection = sqlite3.connect(DATABASE_LOCATION)
    cursor = database_connection.cursor()
    
    noteName = list(cursor.execute(
        'SELECT notename FROM notes WHERE track=? AND sequence=?',
        (TRACK_ID, sequence)
    ))[0][0]

    print(TRACK_ID, sequence, noteName)

    hasNextNote = len(list(cursor.execute(
        'SELECT notename FROM notes WHERE track=? AND sequence=?',
        (TRACK_ID, sequence + 1)
    ))) == 1

    result = None

    if request.method == 'POST':
        notes = request.get_json()
        if noteName in notes:
            result = True
        else:
            result = False
    else:
<<<<<<< HEAD
        result = {'note': 'C#'}

=======
        result = {'note': noteName, 'next': sequence + 1 if hasNextNote else None}
    
>>>>>>> 71d6ec3f6b270badb7dd061969f9546266af81bf
    return jsonify(result)

@app.route('/piano/', methods=['GET'])
def serve_app():
    return send_from_directory(CLIENT_FOLDER, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    print(path)
    return send_from_directory(CLIENT_FOLDER, path)

if __name__ == "__main__":
    app.debug = True
    app.run()
