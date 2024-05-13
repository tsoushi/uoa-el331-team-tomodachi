import flask
from flask import request, jsonify

import database
import domain
import api_response
database.create_table() # データベース初期化

app = flask.Flask(__name__)


@app.route('/text-file', methods=['POST'])
def create():
    data = request.get_json()
    file_name = data['fileName']
    content = data['content']

    text_file = database.create_txt_file(domain.TextFile(file_name, content))
    return jsonify(api_response.text_file.post(text_file))

@app.route('/text-file', methods=['GET'])
def get():
    data = request.get_json()
    file_name = data['fileName']

    text_file = database.get_txt_file(file_name)
    return jsonify(api_response.text_file.get(text_file))


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=8080)