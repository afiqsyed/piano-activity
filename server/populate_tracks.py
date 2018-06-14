import sqlite3
import os

os.remove('data.db')
database_connection = sqlite3.connect('data.db')

cursor = database_connection.cursor()

cursor.execute('CREATE TABLE track (id int PRIMARY KEY, name text)')
cursor.execute('CREATE TABLE notes (track int, sequence int, notename text)')

cursor.execute('INSERT INTO track VALUES (?,?)', (0, "Fur Elise"))
notes = [
    (0, 0, 'E'),
    (0, 1, 'D#'),
    (0, 2, 'E'),
    (0, 3, 'D#'),
    (0, 4, 'E'),
    (0, 5, 'B'),
    (0, 6, 'D'),
    (0, 7, 'C'),
    (0, 8, 'A'),
    (0, 9, 'C'),
    (0, 10, 'E'),
    (0, 11, 'A'),
    (0, 12, 'B'),
    (0, 13, 'E'),
    (0, 14, 'G#'),
    (0, 15, 'B'),
    (0, 16, 'C')
]
cursor.executemany('INSERT INTO notes VALUES (?,?,?)', notes)

database_connection.commit()
database_connection.close()

# Fresh connection to ensure we have the data in there
database_connection = sqlite3.connect('data.db')
cursor = database_connection.cursor()
for track in cursor.execute('SELECT id, name FROM track ORDER BY name'):
    track_id, name = track
    notes = [
        note for note in cursor.execute(
            'SELECT notename, sequence FROM notes WHERE track=? ORDER BY sequence',
            (track_id,)
        )
    ]
    print(name, notes)

