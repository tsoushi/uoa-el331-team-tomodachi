import flask
from flask import request

import database
import domain
database.create_table() # データベース初期化

app = flask.Flask(__name__)


@app.route('/file/create', methods=['POST'])
def create():
    # json api
    data = request.get_json()
    file_name = data['fileName']
    content = data['content']
    # create file (sqlite)
    database.create_txt_file(domain.TXTFile(file_name, content))
    return 'File created'


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=8080)