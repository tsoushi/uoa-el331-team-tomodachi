import sqlite3

class TXTFile:
    def __init__(self, con: sqlite3.Connection):
        self.con: sqlite3.Connection = con

    