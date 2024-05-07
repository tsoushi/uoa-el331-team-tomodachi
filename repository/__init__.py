import sqlite3

from repository.txt_file import TXTFile

class Repository:
    def __init__(self, con: sqlite3.Connection):
        self.con: sqlite3.Connection = con
        self.txt_file = TXTFile(con)

