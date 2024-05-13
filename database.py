import sqlite3
import domain

from typing import Optional

def get_con() -> sqlite3.Connection:
    return sqlite3.connect('database.db')

def create_table():
    con = get_con()
    con.execute('CREATE TABLE IF NOT EXISTS txt_file (filename TEXT PRIMARY KEY, content TEXT)')
    con.commit()
    con.close()

def create_txt_file(txt_file: domain.TextFile) -> domain.TextFile:
    con = get_con()
    con.execute('INSERT INTO txt_file (filename, content) VALUES (?, ?)', (txt_file.filename, txt_file.content))
    con.commit()
    con.close()
    return txt_file

def get_txt_file(filename: str) -> Optional[domain.TextFile]:
    con = get_con()
    cursor = con.cursor()
    cursor.execute('SELECT * FROM txt_file WHERE filename = ?', (filename,))
    row = cursor.fetchone()
    con.close()
    return domain.TextFile(row[0], row[1]) if row else None

