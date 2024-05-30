import sqlite3
import domain
import os

from typing import Optional, List

def get_con() -> sqlite3.Connection:
    dbpath = os.getenv('DATABASE_PATH')
    if dbpath == None:
        dbpath = 'database.db'
    return sqlite3.connect(dbpath)

def create_table():
    con = get_con()
    con.executescript('''
CREATE TABLE IF NOT EXISTS text_file (
    id TEXT PRIMARY KEY,
    name TEXT,
    content TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
''')
    con.commit()
    con.close()

def create_text_file(text_file: domain.TextFile) -> domain.TextFile:
    con = get_con()
    con.execute('INSERT INTO text_file (id, name, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', (
        text_file.id, text_file.name, text_file.content, text_file.created_at, text_file.updated_at))
    con.commit()
    con.close()
    return text_file

def get_text_file(text_file_id: str) -> Optional[domain.TextFile]:
    con = get_con()
    cursor = con.cursor()
    cursor.execute('SELECT * FROM text_file WHERE id = ?', (text_file_id,))
    row = cursor.fetchone()
    con.close()
    return domain.TextFile(id=row[0], name=row[1], content=row[2], created_at=row[3], updated_at=row[4]) if row else None

def get_text_file_multi(text_file_ids: List[str]) -> List[domain.TextFile]:
    con = get_con()
    cursor = con.cursor()
    cursor.execute('SELECT * FROM text_file WHERE id IN ({})'.format(','.join(['?'] * len(text_file_ids))), text_file_ids)
    rows = cursor.fetchall()
    con.close()
    return [domain.TextFile(id=row[0], name=row[1], content=row[2], created_at=row[3], updated_at=row[4]) for row in rows]

def get_all_text_files() -> List[domain.TextFile]:
    con = get_con()
    cursor = con.cursor()
    cursor.execute('SELECT * FROM text_file')
    rows = cursor.fetchall()
    con.close()
    return [domain.TextFile(id=row[0], name=row[1], content=row[2], created_at=row[3], updated_at=row[4]) for row in rows]

def update_text_file(text_file: domain.TextFile) -> domain.TextFile:
    con = get_con()
    con.execute('UPDATE text_file SET name = ?, content = ?, created_at = ?, updated_at = ? WHERE id = ?', (
        text_file.name, text_file.content, text_file.created_at, text_file.updated_at, text_file.id))
    con.commit()
    con.close()
    return text_file

def delete_text_file(text_file_id: str) -> str:
    con = get_con()
    con.execute('DELETE FROM text_file WHERE id = ?', (text_file_id,))
    con.commit()
    con.close()
    return text_file_id
