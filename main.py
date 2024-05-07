import flask
from flask import request
import sqlite3

from repository import Repository
from usecase import Usecase

con = sqlite3.connect('database.db')
repo = Repository(con)
usecase = Usecase(repo)

app = flask.Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/file/create', methods=['POST'])
def create():
    # json api
    data = request.get_json()
    file_name = data['fileName']
    content = data['content']
    # create file (sqlite)
    usecase.txt_file.create(file_name, content)
    return 'File created'


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=8080)